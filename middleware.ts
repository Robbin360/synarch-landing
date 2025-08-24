import { NextRequest, NextResponse } from 'next/server'

// Security headers configuration
const securityHeaders = {
  // Content Security Policy
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://cdn.vercel-insights.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: blob: https: http:",
    "connect-src 'self' https://vitals.vercel-insights.com https://www.google-analytics.com",
    "media-src 'self' data: blob:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
    "block-all-mixed-content"
  ].join('; '),

  // Security headers
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'X-DNS-Prefetch-Control': 'off',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': [
    'camera=()',
    'microphone=()',
    'geolocation=()',
    'payment=()',
    'usb=()',
    'bluetooth=()',
    'accelerometer=()',
    'gyroscope=()',
    'magnetometer=()',
    'ambient-light-sensor=()',
    'encrypted-media=()',
    'autoplay=()',
    'picture-in-picture=()',
    'fullscreen=(self)'
  ].join(', '),

  // Cross-Origin policies
  'Cross-Origin-Embedder-Policy': 'require-corp',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'same-origin',

  // Additional security
  'X-Permitted-Cross-Domain-Policies': 'none',
  'Clear-Site-Data': '"cache", "cookies", "storage"', // Only for logout endpoints
}

// Rate limiting configuration
const rateLimitConfig = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 100, // Limit each IP to 100 requests per windowMs
  skipSuccessfulRequests: false
}

// Simple in-memory rate limiter (for production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

function rateLimit(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitStore.get(ip)

  if (!record || now > record.resetTime) {
    // Reset the record
    rateLimitStore.set(ip, {
      count: 1,
      resetTime: now + rateLimitConfig.windowMs
    })
    return true
  }

  if (record.count >= rateLimitConfig.maxRequests) {
    return false
  }

  record.count++
  return true
}

// Bot detection patterns
const botPatterns = [
  /bot|crawler|spider|crawling/i,
  /google|bing|yahoo|duckduckbot/i,
  /facebook|twitter|linkedin/i,
  /whatsapp|telegram|discord/i
]

function isBot(userAgent: string): boolean {
  return botPatterns.some(pattern => pattern.test(userAgent))
}

// Security logging
function logSecurityEvent(type: string, request: NextRequest, details?: any) {
  const ip = request.headers.get('x-forwarded-for') || 
           request.headers.get('x-real-ip') || 
           request.headers.get('cf-connecting-ip') || 
           'unknown'
           
  if (process.env.NODE_ENV === 'development') {
    console.warn(`[Security] ${type}:`, {
      url: request.url,
      ip,
      userAgent: request.headers.get('user-agent'),
      timestamp: new Date().toISOString(),
      ...details
    })
  }

  // In production, send to monitoring service
  if (process.env.NODE_ENV === 'production' && process.env.SECURITY_WEBHOOK_URL) {
    fetch(process.env.SECURITY_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type,
        url: request.url,
        ip,
        userAgent: request.headers.get('user-agent'),
        timestamp: new Date().toISOString(),
        ...details
      })
    }).catch(() => {}) // Fail silently
  }
}

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const { pathname } = request.nextUrl
  const userAgent = request.headers.get('user-agent') || ''
  const ip = request.headers.get('x-forwarded-for') || 
           request.headers.get('x-real-ip') || 
           request.headers.get('cf-connecting-ip') || 
           'unknown'

  // Skip security checks for static assets and API routes in development
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/api/') ||
    pathname.includes('.')
  ) {
    return response
  }

  // Rate limiting
  if (!isBot(userAgent) && !rateLimit(ip)) {
    logSecurityEvent('RATE_LIMIT_EXCEEDED', request, { ip, limit: rateLimitConfig.maxRequests })
    
    return new NextResponse(
      JSON.stringify({
        error: 'Too Many Requests',
        message: 'Rate limit exceeded. Please try again later.',
        retryAfter: Math.ceil(rateLimitConfig.windowMs / 1000)
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': String(Math.ceil(rateLimitConfig.windowMs / 1000)),
          ...Object.fromEntries(
            Object.entries(securityHeaders).filter(([key]) => 
              ['X-Frame-Options', 'X-Content-Type-Options'].includes(key)
            )
          )
        }
      }
    )
  }

  // Suspicious request detection
  const suspiciousPatterns = [
    /\.\./g, // Path traversal
    /<script/i, // XSS attempt
    /javascript:/i, // JavaScript protocol
    /vbscript:/i, // VBScript protocol
    /onload=/i, // Event handlers
    /onerror=/i,
    /onclick=/i,
    /eval\(/i, // Code injection
    /exec\(/i,
    /union.*select/i, // SQL injection
    /drop.*table/i,
    /insert.*into/i,
    /delete.*from/i
  ]

  const url = request.url
  const isSuspicious = suspiciousPatterns.some(pattern => pattern.test(url))
  
  if (isSuspicious) {
    logSecurityEvent('SUSPICIOUS_REQUEST', request, { 
      pattern: suspiciousPatterns.find(p => p.test(url))?.toString(),
      url 
    })
    
    return new NextResponse(
      JSON.stringify({
        error: 'Forbidden',
        message: 'Suspicious request detected.'
      }),
      {
        status: 403,
        headers: {
          'Content-Type': 'application/json',
          ...Object.fromEntries(
            Object.entries(securityHeaders).filter(([key]) => 
              ['X-Frame-Options', 'X-Content-Type-Options'].includes(key)
            )
          )
        }
      }
    )
  }

  // Add security headers to response
  Object.entries(securityHeaders).forEach(([key, value]) => {
    // Skip Clear-Site-Data for regular requests
    if (key === 'Clear-Site-Data' && !pathname.includes('/logout')) {
      return
    }
    response.headers.set(key, value)
  })

  // Add CSRF protection headers
  response.headers.set('X-CSRF-Protection', '1')
  response.headers.set('X-Request-ID', crypto.randomUUID())

  // Add cache control for security-sensitive pages
  if (pathname.includes('/contact') || pathname.includes('/admin')) {
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate, private')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
  }

  // Add security headers for development
  if (process.env.NODE_ENV === 'development') {
    response.headers.set('X-Development-Mode', 'true')
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (robots.txt, sitemap.xml, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.).*)',
  ],
}