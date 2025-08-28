'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function NavigationDebugger() {
  const [debugInfo, setDebugInfo] = useState<any>({})
  const pathname = usePathname()

  useEffect(() => {
    const checkNavigation = () => {
      const navElements = document.querySelectorAll('[data-testid="quick-nav"]')
      const allNavButtons = document.querySelectorAll('[data-testid="quick-nav"] .synarch-button')
      const desktopNav = document.querySelector('nav[aria-label="Primary navigation"] [data-testid="quick-nav"]')
      const mobileNav = document.querySelector('nav[aria-label="Mobile navigation"] [data-testid="quick-nav"]')
      
      const info = {
        timestamp: new Date().toISOString(),
        pathname,
        navElements: {
          total: navElements.length,
          desktop: !!desktopNav,
          mobile: !!mobileNav,
        },
        buttons: {
          total: allNavButtons.length,
          expected: 4,
          duplicated: allNavButtons.length > 4
        },
        details: Array.from(allNavButtons).map((btn, index) => {
          const computedStyle = getComputedStyle(btn)
          const span = btn.querySelector('span')
          const spanStyle = span ? getComputedStyle(span) : null
          const parentNav = btn.closest('nav')
          
          return {
            index,
            text: btn.textContent,
            parentType: parentNav?.getAttribute('aria-label') || 'unknown',
            button: {
              color: computedStyle.color,
              opacity: computedStyle.opacity,
              visibility: computedStyle.visibility,
            },
            span: spanStyle ? {
              color: spanStyle.color,
              opacity: spanStyle.opacity,
              visibility: spanStyle.visibility,
            } : null
          }
        })
      }
      
      setDebugInfo(info)
      
      if (process.env.NODE_ENV === 'development') {
        console.log('🔍 Navigation Debug Info:', info)
      }
    }

    // Check immediately
    checkNavigation()
    
    // Check after small delay to catch hydration issues
    const timeout = setTimeout(checkNavigation, 100)
    
    // Check periodically during development
    const interval = setInterval(checkNavigation, 2000)

    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
    }
  }, [pathname])

  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <div 
      className="fixed bottom-4 right-4 bg-black/90 text-white p-4 rounded-lg text-xs max-w-md z-50 border border-white/20"
      style={{ fontSize: '10px', lineHeight: '1.2' }}
    >
      <div className="font-bold text-yellow-400 mb-2">🔍 Navigation Debug</div>
      <div><strong>Path:</strong> {debugInfo.pathname}</div>
      <div><strong>Nav Element:</strong> {debugInfo.navElement?.exists ? '✅' : '❌'}</div>
      <div><strong>Nav Visible:</strong> {debugInfo.navElement?.visible}</div>
      <div><strong>Nav Opacity:</strong> {debugInfo.navElement?.opacity}</div>
      
      <div className="mt-2 border-t border-white/20 pt-2">
        <div className="font-bold text-blue-400">Buttons:</div>
        {debugInfo.buttons?.map((btn: any, i: number) => (
          <div key={i} className="mt-1">
            <div><strong>{btn.text}:</strong></div>
            <div className="ml-2">
              <div>Btn Color: {btn.button?.color}</div>
              <div>Span Color: {btn.span?.color}</div>
              <div>Btn Opacity: {btn.button?.opacity}</div>
              <div>Span Opacity: {btn.span?.opacity}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}