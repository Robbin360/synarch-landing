import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { locales } from '../../i18n'
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
import SafeSkipLinks from '@/components/SafeSkipLinks'
import '../globals.css'

export default async function LocaleLayout({
  children,
  params
}: {
  children: any
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound()

  // Enable static rendering
  setRequestLocale(locale)

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <head>
        <meta charSet="utf-8" />
        {/* Performance hints */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        
        {/* Critical resource hints */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="bg-deep-black text-pure-white antialiased overflow-x-hidden">
        <NextIntlClientProvider messages={messages}>
          {/* Skip Links for Accessibility */}
          <SafeSkipLinks />
          
          <ErrorBoundary feature="app-root">
            <NoSSR>
              <ClientInitializer />
              <LuxuryCursor />
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
                fps: 45,
                memoryUsage: 150
              }}
              showAlerts={true}
              compact={false}
            />
            
            {/* Accessibility Toolbar */}
            <div id="accessibility-toolbar-container" />
            
            {/* Navigation Debugger - Development Only */}
            <NavigationDebugger />
          </ErrorBoundary>
        </NextIntlClientProvider>
      </body>
    </html>
  )
} 
