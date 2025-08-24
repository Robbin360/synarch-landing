'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

// Core Web Vitals and custom performance metrics
interface PerformanceMetrics {
  // Core Web Vitals
  CLS: number // Cumulative Layout Shift
  FID: number // First Input Delay
  FCP: number // First Contentful Paint
  LCP: number // Largest Contentful Paint
  TTFB: number // Time to First Byte
  INP: number // Interaction to Next Paint

  // Custom metrics
  fps: number
  frameTime: number
  memoryUsage: number
  jsHeapSize: number
  gpuMemory: number
  renderCalls: number
  triangleCount: number
  networkLatency: number
  bundleSize: number
  
  // User experience metrics
  timeToInteractive: number
  totalBlockingTime: number
  speedIndex: number
  
  // Resource loading metrics
  resourceLoadTime: number
  imageLoadTime: number
  fontLoadTime: number
  
  // Navigation metrics
  navigationStart: number
  domContentLoaded: number
  domComplete: number
  loadEventEnd: number
}

interface PerformanceBudget {
  CLS: number
  FID: number
  LCP: number
  FCP: number
  TTFB: number
  fps: number
  memoryUsage: number
}

interface PerformanceAlert {
  id: string
  metric: keyof PerformanceMetrics
  value: number
  threshold: number
  severity: 'warning' | 'error' | 'critical'
  message: string
  timestamp: number
  suggestions: string[]
}

// Performance budget thresholds (Google recommendations)
const DEFAULT_BUDGET: PerformanceBudget = {
  CLS: 0.1,      // Good: ≤ 0.1
  FID: 100,      // Good: ≤ 100ms
  LCP: 2500,     // Good: ≤ 2.5s
  FCP: 1800,     // Good: ≤ 1.8s
  TTFB: 800,     // Good: ≤ 800ms
  fps: 30,       // Minimum acceptable: ≥ 30fps
  memoryUsage: 100 // Warning at 100MB
}

class PerformanceAnalyzer {
  private metrics: Partial<PerformanceMetrics> = {}
  private alerts: PerformanceAlert[] = []
  private observers: PerformanceObserver[] = []
  private frameId: number | null = null
  private budget: PerformanceBudget
  
  constructor(budget: PerformanceBudget = DEFAULT_BUDGET) {
    this.budget = budget
    this.initializeObservers()
  }

  private initializeObservers() {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
      return
    }

    try {
      // Core Web Vitals observers
      this.observeLayoutShift()
      this.observeFirstInput()
      this.observePaintMetrics()
      this.observeLargestContentfulPaint()
      this.observeNavigationTiming()
      this.observeResourceTiming()
      this.observeLongTasks()
    } catch (error) {
      console.warn('Some performance observers are not supported:', error)
    }
  }

  private observeLayoutShift() {
    try {
      const observer = new PerformanceObserver((list) => {
        let clsValue = this.metrics.CLS || 0
        
        for (const entry of list.getEntries()) {
          const layoutShiftEntry = entry as any
          if (!layoutShiftEntry.hadRecentInput) {
            clsValue += layoutShiftEntry.value
          }
        }
        
        this.updateMetric('CLS', clsValue)
      })
      
      observer.observe({ entryTypes: ['layout-shift'] })
      this.observers.push(observer)
    } catch (error) {
      console.warn('Layout shift observer not supported:', error)
    }
  }

  private observeFirstInput() {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const fidEntry = entry as any
          const fid = fidEntry.processingStart - fidEntry.startTime
          this.updateMetric('FID', fid)
        }
      })
      
      observer.observe({ entryTypes: ['first-input'] })
      this.observers.push(observer)
    } catch (error) {
      console.warn('First input observer not supported:', error)
    }
  }

  private observePaintMetrics() {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            this.updateMetric('FCP', entry.startTime)
          }
        }
      })
      
      observer.observe({ entryTypes: ['paint'] })
      this.observers.push(observer)
    } catch (error) {
      console.warn('Paint observer not supported:', error)
    }
  }

  private observeLargestContentfulPaint() {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        if (lastEntry) {
          this.updateMetric('LCP', lastEntry.startTime)
        }
      })
      
      observer.observe({ entryTypes: ['largest-contentful-paint'] })
      this.observers.push(observer)
    } catch (error) {
      console.warn('LCP observer not supported:', error)
    }
  }

  private observeNavigationTiming() {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const navEntry = entry as PerformanceNavigationTiming
          
          this.updateMetric('TTFB', navEntry.responseStart - navEntry.requestStart)
          this.updateMetric('navigationStart', navEntry.startTime)
          this.updateMetric('domContentLoaded', navEntry.domContentLoadedEventEnd - navEntry.startTime)
          this.updateMetric('domComplete', navEntry.domComplete - navEntry.startTime)
          this.updateMetric('loadEventEnd', navEntry.loadEventEnd - navEntry.startTime)
          
          // Calculate Time to Interactive approximation
          const tti = Math.max(
            navEntry.domContentLoadedEventEnd,
            navEntry.loadEventEnd
          ) - navEntry.startTime
          this.updateMetric('timeToInteractive', tti)
        }
      })
      
      observer.observe({ entryTypes: ['navigation'] })
      this.observers.push(observer)
    } catch (error) {
      console.warn('Navigation timing observer not supported:', error)
    }
  }

  private observeResourceTiming() {
    try {
      const observer = new PerformanceObserver((list) => {
        let totalResourceTime = 0
        let imageLoadTime = 0
        let fontLoadTime = 0
        let resourceCount = 0
        
        for (const entry of list.getEntries()) {
          const resourceEntry = entry as PerformanceResourceTiming
          const loadTime = resourceEntry.responseEnd - resourceEntry.startTime
          
          totalResourceTime += loadTime
          resourceCount++
          
          // Track specific resource types
          if (resourceEntry.initiatorType === 'img') {
            imageLoadTime = Math.max(imageLoadTime, loadTime)
          } else if (resourceEntry.initiatorType === 'css' && 
                    entry.name.includes('font')) {
            fontLoadTime = Math.max(fontLoadTime, loadTime)
          }
        }
        
        if (resourceCount > 0) {
          this.updateMetric('resourceLoadTime', totalResourceTime / resourceCount)
          this.updateMetric('imageLoadTime', imageLoadTime)
          this.updateMetric('fontLoadTime', fontLoadTime)
        }
      })
      
      observer.observe({ entryTypes: ['resource'] })
      this.observers.push(observer)
    } catch (error) {
      console.warn('Resource timing observer not supported:', error)
    }
  }

  private observeLongTasks() {
    try {
      const observer = new PerformanceObserver((list) => {
        let totalBlockingTime = this.metrics.totalBlockingTime || 0
        
        for (const entry of list.getEntries()) {
          const taskEntry = entry as any
          // Tasks longer than 50ms are considered blocking
          if (taskEntry.duration > 50) {
            totalBlockingTime += taskEntry.duration - 50
          }
        }
        
        this.updateMetric('totalBlockingTime', totalBlockingTime)
      })
      
      observer.observe({ entryTypes: ['longtask'] })
      this.observers.push(observer)
    } catch (error) {
      console.warn('Long task observer not supported:', error)
    }
  }

  private updateMetric(key: keyof PerformanceMetrics, value: number) {
    this.metrics[key] = value
    this.checkBudget(key, value)
  }

  private checkBudget(metric: keyof PerformanceMetrics, value: number) {
    const threshold = this.budget[metric as keyof PerformanceBudget]
    if (threshold === undefined) return

    let severity: PerformanceAlert['severity'] = 'warning'
    let exceeded = false

    // Check if metric exceeds budget
    if (metric === 'fps') {
      exceeded = value < threshold
      severity = value < threshold * 0.5 ? 'critical' : 'warning'
    } else {
      exceeded = value > threshold
      severity = value > threshold * 2 ? 'critical' : 
                value > threshold * 1.5 ? 'error' : 'warning'
    }

    if (exceeded) {
      this.createAlert(metric, value, threshold, severity)
    }
  }

  private createAlert(
    metric: keyof PerformanceMetrics, 
    value: number, 
    threshold: number, 
    severity: PerformanceAlert['severity']
  ) {
    const alertId = `${metric}_${Date.now()}`
    
    // Don't create duplicate alerts for the same metric within 5 seconds
    const recentAlert = this.alerts.find(alert => 
      alert.metric === metric && 
      Date.now() - alert.timestamp < 5000
    )
    
    if (recentAlert) return

    const suggestions = this.getSuggestions(metric, value, threshold)
    
    const alert: PerformanceAlert = {
      id: alertId,
      metric,
      value,
      threshold,
      severity,
      message: this.getAlertMessage(metric, value, threshold),
      timestamp: Date.now(),
      suggestions
    }

    this.alerts.push(alert)
    
    // Keep only recent 20 alerts
    if (this.alerts.length > 20) {
      this.alerts = this.alerts.slice(-20)
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Performance Alert [${severity.toUpperCase()}]:`, alert)
    }
  }

  private getAlertMessage(metric: keyof PerformanceMetrics, value: number, threshold: number): string {
    const formatValue = (val: number) => {
      if (metric === 'CLS') return val.toFixed(3)
      if (['FID', 'FCP', 'LCP', 'TTFB'].includes(metric as string)) return `${val.toFixed(0)}ms`
      if (metric === 'fps') return `${val.toFixed(1)} fps`
      if (metric === 'memoryUsage') return `${val.toFixed(1)}MB`
      return val.toString()
    }

    return `${metric.toUpperCase()} is ${formatValue(value)} (threshold: ${formatValue(threshold)})`
  }

  private getSuggestions(metric: keyof PerformanceMetrics, value: number, threshold: number): string[] {
    const suggestions: Record<string, string[]> = {
      CLS: [
        'Set explicit dimensions for images and embeds',
        'Reserve space for ad slots and dynamic content',
        'Use transform animations instead of changing layout properties'
      ],
      FID: [
        'Reduce main thread work by code splitting',
        'Use web workers for heavy computations',
        'Minimize third-party script impact'
      ],
      LCP: [
        'Optimize images with modern formats (WebP, AVIF)',
        'Use preload for critical resources',
        'Implement server-side rendering (SSR)'
      ],
      FCP: [
        'Eliminate render-blocking resources',
        'Minify CSS and JavaScript',
        'Use efficient cache policies'
      ],
      TTFB: [
        'Optimize server response times',
        'Use a Content Delivery Network (CDN)',
        'Implement efficient database queries'
      ],
      fps: [
        'Reduce animation complexity',
        'Use CSS transforms for animations',
        'Implement object pooling for frequent allocations'
      ],
      memoryUsage: [
        'Implement garbage collection strategies',
        'Remove event listeners and observers',
        'Use memory-efficient data structures'
      ]
    }

    return suggestions[metric as string] || ['Monitor and optimize this metric']
  }

  // Start FPS monitoring
  startFrameRateMonitoring() {
    let frames = 0
    let lastTime = performance.now()
    
    const measureFPS = () => {
      frames++
      const currentTime = performance.now()
      
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frames * 1000) / (currentTime - lastTime))
        this.updateMetric('fps', fps)
        this.updateMetric('frameTime', 1000 / fps)
        
        frames = 0
        lastTime = currentTime
      }
      
      this.frameId = requestAnimationFrame(measureFPS)
    }
    
    this.frameId = requestAnimationFrame(measureFPS)
  }

  // Monitor memory usage
  monitorMemory() {
    if ('memory' in performance) {
      const memory = (performance as any).memory
      this.updateMetric('memoryUsage', memory.usedJSHeapSize / 1024 / 1024)
      this.updateMetric('jsHeapSize', memory.totalJSHeapSize / 1024 / 1024)
    }
  }

  // Get current metrics
  getMetrics(): Partial<PerformanceMetrics> {
    return { ...this.metrics }
  }

  // Get performance alerts
  getAlerts(): PerformanceAlert[] {
    return [...this.alerts]
  }

  // Clear old alerts
  clearAlerts() {
    this.alerts = []
  }

  // Get performance grade (A-F)
  getPerformanceGrade(): { grade: string; score: number; details: Record<string, number> } {
    const scores = {
      CLS: this.metrics.CLS ? Math.max(0, 100 - (this.metrics.CLS / 0.25) * 100) : 100,
      FID: this.metrics.FID ? Math.max(0, 100 - (this.metrics.FID / 300) * 100) : 100,
      LCP: this.metrics.LCP ? Math.max(0, 100 - ((this.metrics.LCP - 2500) / 2500) * 100) : 100,
      FCP: this.metrics.FCP ? Math.max(0, 100 - ((this.metrics.FCP - 1800) / 1800) * 100) : 100,
      TTFB: this.metrics.TTFB ? Math.max(0, 100 - ((this.metrics.TTFB - 800) / 800) * 100) : 100,
      fps: this.metrics.fps ? Math.min(100, (this.metrics.fps / 60) * 100) : 100
    }

    const averageScore = Object.values(scores).reduce((a, b) => a + b, 0) / Object.values(scores).length
    
    let grade = 'F'
    if (averageScore >= 90) grade = 'A'
    else if (averageScore >= 80) grade = 'B'
    else if (averageScore >= 70) grade = 'C'
    else if (averageScore >= 60) grade = 'D'

    return { grade, score: Math.round(averageScore), details: scores }
  }

  // Cleanup
  dispose() {
    this.observers.forEach(observer => observer.disconnect())
    this.observers = []
    
    if (this.frameId) {
      cancelAnimationFrame(this.frameId)
      this.frameId = null
    }
  }
}

// Custom hook for performance monitoring
export function usePerformanceMonitor(budget?: PerformanceBudget) {
  const analyzerRef = useRef<PerformanceAnalyzer | null>(null)
  const [metrics, setMetrics] = useState<Partial<PerformanceMetrics>>({})
  const [alerts, setAlerts] = useState<PerformanceAlert[]>([])
  const [grade, setGrade] = useState<{ grade: string; score: number; details: Record<string, number> }>(
    { grade: 'A', score: 100, details: {} }
  )

  useEffect(() => {
    analyzerRef.current = new PerformanceAnalyzer(budget)
    
    // Start monitoring
    analyzerRef.current.startFrameRateMonitoring()
    
    // Update metrics every second
    const metricsInterval = setInterval(() => {
      if (analyzerRef.current) {
        analyzerRef.current.monitorMemory()
        setMetrics(analyzerRef.current.getMetrics())
        setAlerts(analyzerRef.current.getAlerts())
        setGrade(analyzerRef.current.getPerformanceGrade())
      }
    }, 1000)

    return () => {
      clearInterval(metricsInterval)
      if (analyzerRef.current) {
        analyzerRef.current.dispose()
      }
    }
  }, [budget])

  const clearAlerts = useCallback(() => {
    if (analyzerRef.current) {
      analyzerRef.current.clearAlerts()
      setAlerts([])
    }
  }, [])

  return {
    metrics,
    alerts,
    grade,
    clearAlerts,
    analyzer: analyzerRef.current
  }
}

// Performance Dashboard Component
interface PerformanceDashboardProps {
  budget?: PerformanceBudget
  showAlerts?: boolean
  compact?: boolean
  className?: string
}

export function PerformanceDashboard({
  budget,
  showAlerts = true,
  compact = false,
  className = ''
}: PerformanceDashboardProps) {
  const { metrics, alerts, grade, clearAlerts } = usePerformanceMonitor(budget)
  const [isExpanded, setIsExpanded] = useState(false)

  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  const formatMetric = (key: string, value: number | undefined) => {
    if (value === undefined) return 'N/A'
    
    switch (key) {
      case 'CLS':
        return value.toFixed(3)
      case 'FID':
      case 'FCP':
      case 'LCP':
      case 'TTFB':
        return `${Math.round(value)}ms`
      case 'fps':
        return `${Math.round(value)} fps`
      case 'memoryUsage':
      case 'jsHeapSize':
        return `${Math.round(value)}MB`
      default:
        return Math.round(value).toString()
    }
  }

  const getMetricColor = (key: string, value: number | undefined) => {
    if (value === undefined) return 'text-gray-400'
    
    const thresholds = budget || DEFAULT_BUDGET
    const threshold = thresholds[key as keyof PerformanceBudget]
    
    if (!threshold) return 'text-gray-300'
    
    if (key === 'fps') {
      return value >= threshold ? 'text-green-400' : 
             value >= threshold * 0.8 ? 'text-yellow-400' : 'text-red-400'
    } else {
      return value <= threshold ? 'text-green-400' : 
             value <= threshold * 1.5 ? 'text-yellow-400' : 'text-red-400'
    }
  }

  const criticalAlerts = alerts.filter(alert => alert.severity === 'critical')
  const hasIssues = alerts.length > 0

  if (compact) {
    return (
      <div className={`fixed top-4 right-4 z-50 ${className}`}>
        <div className="bg-black/80 backdrop-blur-sm rounded-lg border border-white/10 p-2 text-xs font-mono">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${
              grade.grade === 'A' ? 'bg-green-400' :
              grade.grade === 'B' ? 'bg-yellow-400' :
              'bg-red-400'
            }`} />
            <span className="text-white">Grade: {grade.grade}</span>
            <span className={getMetricColor('fps', metrics.fps)}>FPS: {formatMetric('fps', metrics.fps)}</span>
            {hasIssues && (
              <span className="text-red-400 animate-pulse">⚠ {alerts.length}</span>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`fixed top-4 right-4 z-50 ${className}`}>
      <div className="bg-black/90 backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden">
        {/* Header */}
        <div 
          className="flex items-center justify-between p-3 cursor-pointer hover:bg-white/5 transition-colors"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${
              grade.grade === 'A' ? 'bg-green-400' :
              grade.grade === 'B' ? 'bg-yellow-400' :
              'bg-red-400'
            }`} />
            <span className="text-white font-semibold text-sm">Performance</span>
            <span className="text-gray-400 text-xs">Grade: {grade.grade} ({grade.score}%)</span>
          </div>
          <svg 
            className={`w-4 h-4 text-gray-400 transition-transform ${
              isExpanded ? 'rotate-180' : ''
            }`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="border-t border-white/10">
            {/* Core Web Vitals */}
            <div className="p-3 border-b border-white/10">
              <h4 className="text-xs font-semibold text-gray-300 mb-2">Core Web Vitals</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {['CLS', 'FID', 'FCP', 'LCP', 'TTFB'].map(key => (
                  <div key={key} className="flex justify-between">
                    <span className="text-gray-400">{key}:</span>
                    <span className={getMetricColor(key, metrics[key as keyof PerformanceMetrics])}>
                      {formatMetric(key, metrics[key as keyof PerformanceMetrics])}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Runtime Metrics */}
            <div className="p-3 border-b border-white/10">
              <h4 className="text-xs font-semibold text-gray-300 mb-2">Runtime</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {['fps', 'memoryUsage', 'jsHeapSize'].map(key => (
                  <div key={key} className="flex justify-between">
                    <span className="text-gray-400">{key}:</span>
                    <span className={getMetricColor(key, metrics[key as keyof PerformanceMetrics])}>
                      {formatMetric(key, metrics[key as keyof PerformanceMetrics])}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Alerts */}
            {showAlerts && alerts.length > 0 && (
              <div className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-semibold text-red-400">Alerts ({alerts.length})</h4>
                  <button 
                    onClick={clearAlerts}
                    className="text-xs text-gray-400 hover:text-white transition-colors"
                  >
                    Clear
                  </button>
                </div>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {alerts.slice(-5).map(alert => (
                    <div 
                      key={alert.id}
                      className={`text-xs p-2 rounded border ${
                        alert.severity === 'critical' ? 'bg-red-500/10 border-red-500/20 text-red-300' :
                        alert.severity === 'error' ? 'bg-orange-500/10 border-orange-500/20 text-orange-300' :
                        'bg-yellow-500/10 border-yellow-500/20 text-yellow-300'
                      }`}
                    >
                      <div className="font-medium">{alert.message}</div>
                      {alert.suggestions.length > 0 && (
                        <div className="mt-1 text-xs opacity-75">
                          Tip: {alert.suggestions[0]}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export { PerformanceAnalyzer, type PerformanceMetrics, type PerformanceAlert, DEFAULT_BUDGET }