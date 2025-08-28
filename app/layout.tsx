import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import ClientLayout from '@/components/ClientLayout'
import ScrollObserver from '@/components/ScrollObserver'
import ScrollController from '@/components/ScrollController'
import LuxuryCursor from '@/components/LuxuryCursor'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ErrorBoundary from '@/components/ErrorBoundary'
import { PerformanceDashboard } from '@/components/PerformanceMonitor'
import NoSSR from '@/components/NoSSR'
import ClientInitializer from '@/components/ClientInitializer'
import NavigationDebugger from '@/components/NavigationDebugger'
import DynamicSkipLinks from '@/components/DynamicSkipLinks'



// Font configurations with performance optimizations
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: {
    default: 'SYNARCH - Architects of Inevitability',
    template: '%s | SYNARCH'
  },
  description: 'SYNARCH is a private deep-tech holding company. Silent Power. Architects of Inevitability. Leading innovation in cutting-edge technology solutions.',
  keywords: [
    'SYNARCH', 'deep-tech', 'technology', 'innovation', 'private equity', 
    'architects', 'inevitability', 'silent power', 'holding company',
    'advanced technology', 'disruptive innovation', 'tech leadership'
  ],
  authors: [{ name: 'SYNARCH', url: 'https://synarch.com' }],
  creator: 'SYNARCH',
  publisher: 'SYNARCH',
  applicationName: 'SYNARCH Landing',
  generator: 'Next.js',
  category: 'Technology',
  classification: 'Business',
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://synarch.com',
    siteName: 'SYNARCH',
    title: 'SYNARCH - Architects of Inevitability',
    description: 'SYNARCH is a private deep-tech holding company. Silent Power. Architects of Inevitability.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SYNARCH - Architects of Inevitability',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SYNARCH - Architects of Inevitability',
    description: 'SYNARCH is a private deep-tech holding company. Silent Power. Architects of Inevitability.',
    images: ['/twitter-image.jpg'],
    creator: '@synarch',
    site: '@synarch',
  },
  alternates: {
    canonical: 'https://synarch.com',
  },
  other: {
    'msapplication-TileColor': '#0A0A0A',
    'theme-color': '#0A0A0A',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#111111' },
    { media: '(prefers-color-scheme: dark)', color: '#111111' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="en" 
      className={`${inter.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Performance hints */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        
        {/* Critical resource hints */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* Performance budget and monitoring setup */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Early performance monitoring setup
              window.__appStartTime = Date.now();
              
              // Critical metrics collection
              if ('PerformanceObserver' in window) {
                try {
                  // Monitor critical rendering path
                  const observer = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                      if (entry.name === 'first-contentful-paint') {
                        window.__fcpTime = entry.startTime;
                      }
                    }
                  });
                  observer.observe({ entryTypes: ['paint'] });
                } catch (e) {
                  // Fallback for unsupported browsers
                }
              }
            `
          }}
        />
        
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'SYNARCH',
              description: 'Private deep-tech holding company - Architects of Inevitability',
              url: 'https://synarch.com',
              logo: 'https://synarch.com/logo.jpg',
              foundingDate: '2024',
              industry: 'Technology',
              numberOfEmployees: '10-50',
              knowsAbout: [
                'Deep Technology',
                'Innovation',
                'Technology Investment',
                'Disruptive Technology'
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'General Inquiry',
                url: 'https://synarch.com/contact'
              },
              sameAs: [
                'https://linkedin.com/company/synarch',
                'https://twitter.com/synarch'
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.className} bg-deep-black text-pure-white antialiased overflow-x-hidden`}>
        {/* Skip Links for Accessibility - Renderizado solo en cliente */}
        <DynamicSkipLinks />
        
        <ErrorBoundary feature="app-root">
          <NoSSR>
            <ClientInitializer />
            <LuxuryCursor />
            {/* DEBUGGING: TEST #2 - READY TO DISABLE ScrollController */}
            <ScrollController>
              <div className="relative z-10">
                <ScrollObserver />
                <Header />
                <main id="main-content" role="main" aria-label="Main content">
                  <ErrorBoundary
                    feature="page-content"
                    fallback={
                      <div className="min-h-screen flex items-center justify-center">
                        <div className="text-center p-8">
                          <h1 className="text-2xl font-bold text-red-400 mb-4">Page Error</h1>
                          <p className="text-gray-400 mb-6">Something went wrong loading this page.</p>
                          <a 
                            href="/"
                            className="inline-block px-6 py-2 bg-luxury-gold text-deep-black rounded-lg hover:bg-luxury-gold/90 transition-colors"
                          >
                            Go Home
                          </a>
                        </div>
                      </div>
                    }
                  >
                    <ClientLayout>{children}</ClientLayout>
                  </ErrorBoundary>
                </main>
                <Footer />
              </div>
            </ScrollController>
          </NoSSR>
          
          {/* Performance monitoring dashboard for development */}
          <PerformanceDashboard 
            budget={{
              CLS: 0.1,
              FID: 100,
              LCP: 2500,
              FCP: 1800,
              TTFB: 800,
              fps: 45, // Slightly higher threshold for luxury experience
              memoryUsage: 150 // Higher threshold for 3D content
            }}
            showAlerts={true}
            compact={false}
          />
          
          {/* Accessibility Toolbar */}
          <div id="accessibility-toolbar-container" />
          
          {/* Navigation Debugger - Development Only */}
          <NavigationDebugger />
        </ErrorBoundary>
      </body>
    </html>
  )
} 