'use client'

import { useEffect, useRef } from 'react'

// Performance monitoring and optimization utilities
export class LuxuryPerformanceMonitor {
  private frameCount = 0
  private lastTime = 0
  private fps = 60
  private rafId: number | null = null

  startMonitoring(callback?: (fps: number) => void) {
    const monitor = (currentTime: number) => {
      this.frameCount++
      
      if (currentTime >= this.lastTime + 1000) {
        this.fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime))
        this.frameCount = 0
        this.lastTime = currentTime
        
        if (callback) callback(this.fps)
        
        // Performance warnings for luxury experience
        if (this.fps < 45 && process.env.NODE_ENV === 'development') {
          console.warn('Performance Warning: FPS below luxury threshold:', this.fps)
        }
      }
      
      this.rafId = requestAnimationFrame(monitor)
    }
    
    this.rafId = requestAnimationFrame(monitor)
  }

  stopMonitoring() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId)
      this.rafId = null
    }
  }

  getCurrentFPS() {
    return this.fps
  }
}

// Hardware acceleration utilities
export const optimizeForGPU = (element: HTMLElement) => {
  element.style.willChange = 'transform, opacity'
  element.style.transform = 'translateZ(0)'
  element.style.backfaceVisibility = 'hidden'
  element.style.perspective = '1000px'
}

export const cleanupGPUOptimization = (element: HTMLElement) => {
  element.style.willChange = 'auto'
  element.style.transform = ''
  element.style.backfaceVisibility = ''
  element.style.perspective = ''
}

// Intersection Observer for performance
export const useLuxuryIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = {}
) => {
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const defaultOptions: IntersectionObserverInit = {
      rootMargin: '50px',
      threshold: [0, 0.25, 0.5, 0.75, 1],
      ...options
    }

    observerRef.current = new IntersectionObserver(callback, defaultOptions)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [callback, options])

  return observerRef.current
}

// Resource preloading for luxury assets
export const preloadLuxuryAssets = () => {
  // Preload critical fonts
  const fontPreloads = [
    { family: 'Inter', weights: ['400', '500', '600'] },
    { family: 'Playfair Display', weights: ['200', '300', '400'] }
  ]

  fontPreloads.forEach(({ family, weights }) => {
    weights.forEach(weight => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'font'
      link.type = 'font/woff2'
      link.crossOrigin = 'anonymous'
      link.href = `https://fonts.gstatic.com/s/${family.toLowerCase().replace(' ', '')}/v${weight}.woff2`
      document.head.appendChild(link)
    })
  })
}

// Debounced resize handler for performance
export const useDebouncedResize = (callback: () => void, delay: number = 150) => {
  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const handleResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(callback, delay)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(timeoutId)
    }
  }, [callback, delay])
}

// Memory usage optimization
export const optimizeMemoryUsage = () => {
  // Clean up unused elements
  const cleanupUnusedElements = () => {
    const elements = document.querySelectorAll('[data-cleanup="true"]')
    elements.forEach(element => {
      if (!element.getBoundingClientRect().width) {
        element.remove()
      }
    })
  }

  // Throttled cleanup
  let lastCleanup = 0
  const throttledCleanup = () => {
    const now = Date.now()
    if (now - lastCleanup > 5000) { // 5 seconds
      cleanupUnusedElements()
      lastCleanup = now
    }
  }

  return { throttledCleanup }
}

// Performance component wrapper
interface PerformanceWrapperProps {
  children: React.ReactNode
  enableMonitoring?: boolean
}

export default function PerformanceWrapper({ 
  children, 
  enableMonitoring = false 
}: PerformanceWrapperProps) {
  const monitorRef = useRef<LuxuryPerformanceMonitor | null>(null)

  useEffect(() => {
    if (enableMonitoring && !monitorRef.current) {
      monitorRef.current = new LuxuryPerformanceMonitor()
      monitorRef.current.startMonitoring((fps) => {
        if (process.env.NODE_ENV === 'development') {
          console.log('Luxury Experience FPS:', fps)
        }
      })
    }

    return () => {
      if (monitorRef.current) {
        monitorRef.current.stopMonitoring()
      }
    }
  }, [enableMonitoring])

  useEffect(() => {
    // Initialize performance optimizations
    preloadLuxuryAssets()
    
    // Global performance settings
    if (typeof window !== 'undefined') {
      // Enable GPU acceleration for scroll
      document.documentElement.style.transform = 'translateZ(0)'
      
      // Optimize touch interactions for mobile luxury experience
      document.documentElement.style.touchAction = 'manipulation'
    }
  }, [])

  return <>{children}</>
}