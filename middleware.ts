import { NextRequest, NextResponse } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'
import { locales, defaultLocale } from './i18n'

// Create the intl middleware
const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed'
})

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
  const { pathname } = request.nextUrl
  
  // Skip middleware for static assets and Next.js internal routes
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/robots.txt') ||
    pathname.startsWith('/sitemap.xml') ||
    pathname.startsWith('/og-image.jpg') ||
    pathname.startsWith('/twitter-image.jpg') ||
    pathname.startsWith('/capability-brief.pdf') ||
    pathname.startsWith('/_not-found') ||
    pathname.startsWith('/_error')
  ) {
    return NextResponse.next()
  }

  // First handle internationalization
  const intlResponse = intlMiddleware(request)
  
  // Add security headers to the response
  Object.entries(securityHeaders).forEach(([key, value]) => {
    intlResponse.headers.set(key, value)
  })

  // Rate limiting
  const ip = request.headers.get('x-forwarded-for') || 
           request.headers.get('x-real-ip') || 
           request.headers.get('cf-connecting-ip') || 
           'unknown'
  
  if (!rateLimit(ip)) {
    logSecurityEvent('rate_limit_exceeded', request, { ip })
    return new NextResponse('Too Many Requests', { status: 429 })
  }

  // Bot detection and logging
  const userAgent = request.headers.get('user-agent') || ''
  if (isBot(userAgent)) {
    logSecurityEvent('bot_detected', request, { userAgent })
  }

  return intlResponse
}

export const config = {
  matcher: [
    // Enable internationalization for locale routes
    '/(en|es)/:path*',
    // Enable middleware for other routes but exclude static assets
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|og-image.jpg|twitter-image.jpg|capability-brief.pdf|.*\\.).*)',
  ],
}
