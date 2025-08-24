'use client'

import React, { Component, ReactNode } from 'react'

// Advanced error classification and telemetry
interface ErrorContext {
  errorId: string
  timestamp: string
  userAgent: string
  url: string
  userId?: string
  sessionId: string
  buildVersion: string
  feature: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  tags: string[]
  breadcrumbs: Breadcrumb[]
  performanceMetrics?: PerformanceSnapshot
}

interface Breadcrumb {
  timestamp: string
  category: 'navigation' | 'interaction' | 'error' | 'api' | 'state'
  message: string
  level: 'info' | 'warning' | 'error'
  data?: any
}

interface PerformanceSnapshot {
  memory: number
  fps: number
  loadTime: number
  renderTime: number
}

interface RecoveryStrategy {
  name: string
  condition: (error: Error) => boolean
  action: () => Promise<boolean>
  maxAttempts: number
}

// Advanced telemetry service
class TelemetryService {
  private static instance: TelemetryService
  private breadcrumbs: Breadcrumb[] = []
  private sessionId = this.generateSessionId()
  private maxBreadcrumbs = 50
  
  static getInstance(): TelemetryService {
    if (!TelemetryService.instance) {
      TelemetryService.instance = new TelemetryService()
    }
    return TelemetryService.instance
  }

  private generateSessionId(): string {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  addBreadcrumb(breadcrumb: Omit<Breadcrumb, 'timestamp'>): void {
    this.breadcrumbs.push({
      ...breadcrumb,
      timestamp: new Date().toISOString()
    })

    // Keep only recent breadcrumbs
    if (this.breadcrumbs.length > this.maxBreadcrumbs) {
      this.breadcrumbs = this.breadcrumbs.slice(-this.maxBreadcrumbs)
    }
  }

  private classifyError(error: Error): { severity: ErrorContext['severity'], tags: string[] } {
    const message = error.message.toLowerCase()
    const stack = error.stack?.toLowerCase() || ''
    
    // Critical errors that break core functionality
    if (message.includes('network') || message.includes('fetch') || 
        message.includes('connection') || message.includes('timeout')) {
      return { severity: 'high', tags: ['network', 'connectivity'] }
    }
    
    // WebGL/Three.js related errors
    if (message.includes('webgl') || message.includes('three') || 
        message.includes('shader') || message.includes('texture')) {
      return { severity: 'medium', tags: ['webgl', 'graphics', 'three-js'] }
    }
    
    // Memory related errors
    if (message.includes('memory') || message.includes('allocation') ||
        message.includes('out of memory')) {
      return { severity: 'high', tags: ['memory', 'performance'] }
    }
    
    // React/Hydration errors
    if (message.includes('hydration') || message.includes('server') ||
        message.includes('mismatch')) {
      return { severity: 'medium', tags: ['react', 'hydration', 'ssr'] }
    }
    
    // Chunk loading errors (code splitting)
    if (message.includes('chunk') || message.includes('loading')) {
      return { severity: 'high', tags: ['loading', 'code-splitting', 'network'] }
    }
    
    // Animation/Performance errors
    if (message.includes('animation') || message.includes('frame') ||
        message.includes('performance')) {
      return { severity: 'low', tags: ['animation', 'performance'] }
    }
    
    return { severity: 'medium', tags: ['unknown'] }
  }

  private getPerformanceSnapshot(): PerformanceSnapshot | undefined {
    try {
      const memory = (performance as any).memory?.usedJSHeapSize / 1024 / 1024 || 0
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      const loadTime = navigation ? navigation.loadEventEnd - navigation.fetchStart : 0
      
      return {
        memory,
        fps: 60, // Would be updated by performance monitor
        loadTime,
        renderTime: Date.now() - (window as any).__appStartTime || 0
      }
    } catch {
      return undefined
    }
  }

  createErrorContext(error: Error, errorInfo: React.ErrorInfo, feature: string): ErrorContext {
    const { severity, tags } = this.classifyError(error)
    
    return {
      errorId: `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      sessionId: this.sessionId,
      buildVersion: process.env.NEXT_PUBLIC_BUILD_VERSION || 'unknown',
      feature,
      severity,
      tags,
      breadcrumbs: [...this.breadcrumbs],
      performanceMetrics: this.getPerformanceSnapshot()
    }
  }

  async reportError(context: ErrorContext, error: Error, errorInfo: React.ErrorInfo): Promise<void> {
    // Development logging
    if (process.env.NODE_ENV === 'development') {
      console.group(`🚨 Advanced Error Report - ${context.severity.toUpperCase()}`)
      console.error('Error:', error)
      console.error('Error Info:', errorInfo)
      console.log('Context:', context)
      console.log('Breadcrumbs:', context.breadcrumbs)
      console.groupEnd()
    }

    // Production telemetry
    if (process.env.NODE_ENV === 'production') {
      try {
        // Send to multiple telemetry services
        await Promise.allSettled([
          this.sendToSentry(context, error, errorInfo),
          this.sendToGoogleAnalytics(context),
          this.sendToCustomEndpoint(context, error, errorInfo)
        ])
      } catch (telemetryError) {
        // Fallback: store locally for later sync
        this.storeLocallyForSync(context, error, errorInfo)
      }
    }
  }

  private async sendToSentry(context: ErrorContext, error: Error, errorInfo: React.ErrorInfo): Promise<void> {
    // Sentry integration would go here
    if (window.Sentry && typeof window.Sentry.withScope === 'function') {
      window.Sentry.withScope((scope) => {
        scope.setContext('errorBoundary', context)
        scope.setLevel(context.severity as any)
        scope.setTags(Object.fromEntries(context.tags.map(tag => [tag, true])))
        window.Sentry!.captureException(error)
      })
    }
  }

  private async sendToGoogleAnalytics(context: ErrorContext): Promise<void> {
    if (window.gtag) {
      window.gtag('event', 'exception', {
        description: `${context.feature}: ${context.tags.join(', ')}`,
        fatal: context.severity === 'critical',
        custom_map: {
          error_id: context.errorId,
          severity: context.severity,
          feature: context.feature
        }
      })
    }
  }

  private async sendToCustomEndpoint(context: ErrorContext, error: Error, errorInfo: React.ErrorInfo): Promise<void> {
    // Custom telemetry endpoint
    const endpoint = process.env.NEXT_PUBLIC_TELEMETRY_ENDPOINT
    if (!endpoint) return
    
    await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        context,
        error: {
          message: error.message,
          stack: error.stack,
          name: error.name
        },
        errorInfo: {
          componentStack: errorInfo.componentStack
        }
      })
    })
  }

  private storeLocallyForSync(context: ErrorContext, error: Error, errorInfo: React.ErrorInfo): void {
    try {
      const errors = JSON.parse(localStorage.getItem('pending_errors') || '[]')
      errors.push({ context, error: error.message, errorInfo, timestamp: Date.now() })
      
      // Keep only recent 10 errors
      if (errors.length > 10) {
        errors.splice(0, errors.length - 10)
      }
      
      localStorage.setItem('pending_errors', JSON.stringify(errors))
    } catch {
      // Ignore storage errors
    }
  }
}

// Recovery strategies
class RecoveryManager {
  private strategies: RecoveryStrategy[] = [
    {
      name: 'chunk-reload',
      condition: (error) => error.message.includes('Loading chunk') || error.message.includes('ChunkLoadError'),
      action: async () => {
        // Force reload for chunk loading errors
        window.location.reload()
        return true
      },
      maxAttempts: 1
    },
    {
      name: 'clear-cache',
      condition: (error) => error.message.includes('cache') || error.message.includes('stale'),
      action: async () => {
        if ('caches' in window) {
          const cacheNames = await caches.keys()
          await Promise.all(cacheNames.map(name => caches.delete(name)))
          window.location.reload()
          return true
        }
        return false
      },
      maxAttempts: 1
    },
    {
      name: 'memory-cleanup',
      condition: (error) => error.message.includes('memory') || error.message.includes('allocation'),
      action: async () => {
        // Force garbage collection
        if (window.gc) {
          window.gc()
        }
        
        // Clear any large objects from memory
        if (window.__clearLargeObjects) {
          window.__clearLargeObjects()
        }
        
        return true
      },
      maxAttempts: 2
    },
    {
      name: 'network-retry',
      condition: (error) => error.message.includes('network') || error.message.includes('fetch'),
      action: async () => {
        // Wait and retry
        await new Promise(resolve => setTimeout(resolve, 2000))
        return navigator.onLine
      },
      maxAttempts: 3
    }
  ]

  async attemptRecovery(error: Error): Promise<boolean> {
    for (const strategy of this.strategies) {
      if (strategy.condition(error)) {
        try {
          const success = await strategy.action()
          if (success) {
            console.log(`Recovery successful using strategy: ${strategy.name}`)
            return true
          }
        } catch (recoveryError) {
          console.error(`Recovery strategy ${strategy.name} failed:`, recoveryError)
        }
      }
    }
    
    return false
  }
}

// Enhanced props and state interfaces
interface Props {
  children: ReactNode
  fallback?: ReactNode | ((error: Error, errorInfo: React.ErrorInfo, retry: () => void) => ReactNode)
  onError?: (error: Error, errorInfo: React.ErrorInfo, context: ErrorContext) => void
  resetOnPropsChange?: boolean
  resetKeys?: Array<string | number>
  feature?: string
  maxRetries?: number
  autoRecovery?: boolean
  isolate?: boolean // Isolate errors to prevent cascading failures
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
  errorContext?: ErrorContext
  retryCount: number
  recoveryAttempts: number
  isRecovering: boolean
  lastErrorTime: number
}

class ErrorBoundary extends Component<Props, State> {
  private retryTimeoutId: NodeJS.Timeout | null = null
  private telemetryService = TelemetryService.getInstance()
  private recoveryManager = new RecoveryManager()
  private feature: string

  constructor(props: Props) {
    super(props)
    this.feature = props.feature || 'unknown'
    
    this.state = { 
      hasError: false, 
      retryCount: 0,
      recoveryAttempts: 0,
      isRecovering: false,
      lastErrorTime: 0
    }
    
    // Add breadcrumb for component initialization
    this.telemetryService.addBreadcrumb({
      category: 'state',
      message: `ErrorBoundary initialized for feature: ${this.feature}`,
      level: 'info'
    })
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { 
      hasError: true, 
      error,
      lastErrorTime: Date.now()
    }
  }

  async componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const { maxRetries = 3, autoRecovery = true } = this.props
    
    // Create comprehensive error context
    const context = this.telemetryService.createErrorContext(error, errorInfo, this.feature)
    
    // Add error breadcrumb
    this.telemetryService.addBreadcrumb({
      category: 'error',
      message: `Error caught in ${this.feature}: ${error.message}`,
      level: 'error',
      data: {
        errorId: context.errorId,
        retryCount: this.state.retryCount,
        stack: error.stack?.slice(0, 200)
      }
    })
    
    // Update state with full context
    this.setState({ 
      errorInfo, 
      errorContext: context 
    })
    
    // Report to telemetry services
    await this.telemetryService.reportError(context, error, errorInfo)
    
    // Call custom error handler
    this.props.onError?.(error, errorInfo, context)

    // Attempt automatic recovery if enabled
    if (autoRecovery && this.state.recoveryAttempts < 2) {
      this.setState({ isRecovering: true, recoveryAttempts: this.state.recoveryAttempts + 1 })
      
      const recovered = await this.recoveryManager.attemptRecovery(error)
      
      this.setState({ isRecovering: false })
      
      if (recovered) {
        // If recovery was successful, reset the error state
        this.resetErrorBoundary()
        return
      }
    }

    // Auto-retry mechanism for recoverable errors
    if (this.shouldAutoRetry(error) && this.state.retryCount < maxRetries) {
      this.scheduleRetry()
    }
  }

  componentDidUpdate(prevProps: Props) {
    // Reset error state when resetKeys change
    if (this.props.resetOnPropsChange && this.props.resetKeys) {
      const hasResetKeyChanged = this.props.resetKeys.some((key, idx) => 
        prevProps.resetKeys?.[idx] !== key
      )
      
      if (hasResetKeyChanged && this.state.hasError) {
        this.telemetryService.addBreadcrumb({
          category: 'state',
          message: 'ErrorBoundary reset due to resetKeys change',
          level: 'info'
        })
        this.resetErrorBoundary()
      }
    }
    
    // Check for rapid consecutive errors (error storm detection)
    if (this.state.hasError && this.state.lastErrorTime) {
      const timeSinceLastError = Date.now() - this.state.lastErrorTime
      if (timeSinceLastError < 1000 && this.state.retryCount > 2) {
        // Prevent error storms by disabling auto-retry
        this.telemetryService.addBreadcrumb({
          category: 'error',
          message: 'Error storm detected - disabling auto-retry',
          level: 'warning',
          data: { retryCount: this.state.retryCount, timeSinceLastError }
        })
        
        this.clearRetryTimeout()
      }
    }
  }

  componentWillUnmount() {
    this.clearRetryTimeout()
    
    this.telemetryService.addBreadcrumb({
      category: 'state',
      message: `ErrorBoundary unmounted for feature: ${this.feature}`,
      level: 'info',
      data: {
        hadError: this.state.hasError,
        retryCount: this.state.retryCount
      }
    })
  }

  private clearRetryTimeout() {
    if (this.retryTimeoutId) {
      clearTimeout(this.retryTimeoutId)
      this.retryTimeoutId = null
    }
  }

  shouldAutoRetry = (error: Error): boolean => {
    // Auto-retry for specific recoverable errors
    const retryableErrors = [
      'ChunkLoadError',
      'Loading chunk',
      'Loading CSS chunk',
      'NetworkError',
      'Failed to fetch',
      'timeout',
      'AbortError',
      'QuotaExceededError'
    ]
    
    return retryableErrors.some(errorType => 
      error.message.includes(errorType) || error.name.includes(errorType)
    )
  }

  scheduleRetry = () => {
    const { maxRetries = 3 } = this.props
    const retryDelay = Math.min(1000 * Math.pow(2, this.state.retryCount), 30000) // Max 30s delay
    
    this.telemetryService.addBreadcrumb({
      category: 'state',
      message: `Scheduling retry ${this.state.retryCount + 1}/${maxRetries} in ${retryDelay}ms`,
      level: 'info'
    })
    
    this.retryTimeoutId = setTimeout(() => {
      this.setState(prevState => ({
        hasError: false,
        error: undefined,
        errorInfo: undefined,
        errorContext: undefined,
        retryCount: prevState.retryCount + 1
      }))
    }, retryDelay)
  }

  resetErrorBoundary = () => {
    this.clearRetryTimeout()
    
    this.telemetryService.addBreadcrumb({
      category: 'state',
      message: 'ErrorBoundary manually reset',
      level: 'info',
      data: {
        previousRetryCount: this.state.retryCount,
        previousRecoveryAttempts: this.state.recoveryAttempts
      }
    })
    
    this.setState({ 
      hasError: false, 
      error: undefined,
      errorInfo: undefined,
      errorContext: undefined,
      retryCount: 0,
      recoveryAttempts: 0,
      isRecovering: false,
      lastErrorTime: 0
    })
  }

  render() {
    if (this.state.hasError) {
      const { fallback, maxRetries = 3 } = this.props
      const { error, errorInfo, errorContext, retryCount, isRecovering } = this.state
      
      // Return custom fallback if provided
      if (fallback) {
        if (typeof fallback === 'function') {
          return fallback(error!, errorInfo!, this.resetErrorBoundary)
        }
        return fallback
      }

      const isRetryable = error && this.shouldAutoRetry(error)
      const canRetry = retryCount < maxRetries
      const isErrorStorm = retryCount > 2 && (Date.now() - this.state.lastErrorTime) < 1000
      
      // Get error-specific messaging
      const errorSpecificContent = this.getErrorSpecificContent(error, errorContext)

      return (
        <div className="flex flex-col items-center justify-center min-h-[200px] p-8 text-center bg-charcoal/20 rounded-lg border border-white/10 backdrop-blur-sm">
          <div className="max-w-md w-full">
            {/* Error Icon with severity-based color */}
            <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
              errorContext?.severity === 'critical' ? 'bg-red-500/20' :
              errorContext?.severity === 'high' ? 'bg-orange-500/20' :
              errorContext?.severity === 'medium' ? 'bg-yellow-500/20' :
              'bg-blue-500/20'
            }`}>
              {isRecovering ? (
                <svg className="w-8 h-8 text-blue-400 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              ) : (
                <svg className={`w-8 h-8 ${
                  errorContext?.severity === 'critical' ? 'text-red-400' :
                  errorContext?.severity === 'high' ? 'text-orange-400' :
                  errorContext?.severity === 'medium' ? 'text-yellow-400' :
                  'text-blue-400'
                }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              )}
            </div>
            
            {/* Dynamic title based on error context */}
            <h2 className="text-xl font-semibold mb-2 text-white">
              {isRecovering ? 'Attempting Recovery...' :
               isErrorStorm ? 'Multiple Errors Detected' :
               errorSpecificContent.title}
            </h2>
            
            {/* Error-specific description */}
            <p className="text-gray-400 mb-4">
              {isRecovering ? 'Please wait while we try to resolve this issue automatically.' :
               isErrorStorm ? 'We\'ve detected multiple consecutive errors. Manual intervention may be required.' :
               errorSpecificContent.description}
            </p>
            
            {/* Development details */}
            {process.env.NODE_ENV === 'development' && error && (
              <details className="mb-4 text-left">
                <summary className="cursor-pointer text-sm text-gray-400 hover:text-gray-300 mb-2">
                  Technical Details (Development)
                </summary>
                <div className="bg-black/20 rounded p-3 text-xs font-mono text-red-300 overflow-auto max-h-32 space-y-2">
                  <div>
                    <strong>Error ID:</strong> {errorContext?.errorId}
                  </div>
                  <div>
                    <strong>Feature:</strong> {this.feature}
                  </div>
                  <div>
                    <strong>Severity:</strong> {errorContext?.severity}
                  </div>
                  <div>
                    <strong>Tags:</strong> {errorContext?.tags.join(', ')}
                  </div>
                  <div>
                    <strong>Message:</strong> {error.message}
                  </div>
                  <div>
                    <strong>Retry Count:</strong> {retryCount}/{maxRetries}
                  </div>
                  <div>
                    <strong>Recovery Attempts:</strong> {this.state.recoveryAttempts}/2
                  </div>
                  {errorContext?.performanceMetrics && (
                    <div>
                      <strong>Memory:</strong> {errorContext.performanceMetrics.memory.toFixed(1)}MB
                    </div>
                  )}
                </div>
              </details>
            )}
            
            {/* Action buttons */}
            <div className="flex gap-3 justify-center flex-wrap">
              {!isRecovering && (
                <>
                  <button
                    onClick={this.resetErrorBoundary}
                    disabled={isErrorStorm}
                    className={`px-6 py-2 rounded-lg transition-colors ${
                      isErrorStorm 
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        : 'bg-luxury-gold text-deep-black hover:bg-luxury-gold/90'
                    }`}
                    aria-label="Try again"
                  >
                    {isErrorStorm ? 'Too Many Retries' : 'Try Again'}
                  </button>
                  
                  <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                    aria-label="Refresh page"
                  >
                    Refresh Page
                  </button>
                  
                  {errorContext?.severity === 'high' || errorContext?.severity === 'critical' ? (
                    <button
                      onClick={() => window.location.href = '/'}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      aria-label="Go to homepage"
                    >
                      Go Home
                    </button>
                  ) : null}
                </>
              )}
            </div>
            
            {/* Status indicators */}
            <div className="mt-4 space-y-2">
              {retryCount > 0 && (
                <p className="text-xs text-gray-500">
                  Retry attempt: {retryCount}/{maxRetries}
                </p>
              )}
              
              {isRetryable && canRetry && !isErrorStorm && (
                <p className="text-xs text-blue-400">
                  ℹ️ This error type supports automatic retry
                </p>
              )}
              
              {errorContext && (
                <p className="text-xs text-gray-500">
                  Error ID: {errorContext.errorId.slice(-8)}
                </p>
              )}
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
  
  private getErrorSpecificContent(error?: Error, context?: ErrorContext) {
    if (!error || !context) {
      return {
        title: 'Something went wrong',
        description: 'An unexpected error occurred. Please try again.'
      }
    }
    
    // Content based on error tags and severity
    if (context.tags.includes('network')) {
      return {
        title: 'Connection Issue',
        description: 'Unable to connect to our servers. Please check your internet connection and try again.'
      }
    }
    
    if (context.tags.includes('webgl') || context.tags.includes('three-js')) {
      return {
        title: 'Graphics Error',
        description: 'There was an issue with 3D graphics rendering. This might be due to browser compatibility or graphics drivers.'
      }
    }
    
    if (context.tags.includes('memory')) {
      return {
        title: 'Memory Issue',
        description: 'The application is using too much memory. Try closing other browser tabs or refreshing the page.'
      }
    }
    
    if (context.tags.includes('loading') || context.tags.includes('code-splitting')) {
      return {
        title: 'Loading Error',
        description: 'Failed to load application resources. This is usually temporary - please try refreshing the page.'
      }
    }
    
    if (context.tags.includes('hydration')) {
      return {
        title: 'Rendering Issue',
        description: 'There was a mismatch between server and client rendering. Refreshing should resolve this.'
      }
    }
    
    // Default based on severity
    switch (context.severity) {
      case 'critical':
        return {
          title: 'Critical Error',
          description: 'A critical error occurred that affects core functionality. Please refresh the page or contact support.'
        }
      case 'high':
        return {
          title: 'Serious Error',
          description: 'A serious error occurred. Some features may not work properly until resolved.'
        }
      case 'medium':
        return {
          title: 'Error Occurred',
          description: 'An error occurred but the application should continue to function. You may try again.'
        }
      default:
        return {
          title: 'Minor Issue',
          description: 'A minor issue occurred. This should not affect your overall experience.'
        }
    }
  }
}

// Enhanced higher-order component for wrapping components with error boundaries
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Partial<Props>
) {
  const WrappedComponent = (props: P) => {
    const feature = (Component.displayName || Component.name || 'Unknown').toLowerCase()
    
    return (
      <ErrorBoundary 
        feature={feature}
        autoRecovery={true}
        maxRetries={3}
        {...errorBoundaryProps}
      >
        <Component {...props} />
      </ErrorBoundary>
    )
  }
  
  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`
  
  return WrappedComponent
}

// Specialized error boundaries for different use cases
export function NetworkErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary
      feature="network"
      autoRecovery={true}
      maxRetries={5}
      fallback={(error, errorInfo, retry) => (
        <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
          <h3 className="text-orange-400 font-semibold mb-2">Connection Issue</h3>
          <p className="text-gray-400 mb-4">Unable to connect to our servers. Retrying automatically...</p>
          <button 
            onClick={retry}
            className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors"
          >
            Retry Now
          </button>
        </div>
      )}
    >
      {children}
    </ErrorBoundary>
  )
}

export function GraphicsErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary
      feature="graphics"
      autoRecovery={false}
      maxRetries={2}
      fallback={(error, errorInfo, retry) => (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
          <h3 className="text-red-400 font-semibold mb-2">Graphics Error</h3>
          <p className="text-gray-400 mb-4">
            There was an issue with 3D graphics. This might be due to browser compatibility.
          </p>
          <div className="space-x-2">
            <button 
              onClick={retry}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
            <button 
              onClick={() => {
                localStorage.setItem('disable-3d', 'true')
                window.location.reload()
              }}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
            >
              Disable 3D
            </button>
          </div>
        </div>
      )}
    >
      {children}
    </ErrorBoundary>
  )
}

// Global error boundary setup utility
export function setupGlobalErrorHandling() {
  const telemetry = TelemetryService.getInstance()
  
  // Global unhandled promise rejection handler
  window.addEventListener('unhandledrejection', (event) => {
    telemetry.addBreadcrumb({
      category: 'error',
      message: `Unhandled Promise Rejection: ${event.reason}`,
      level: 'error',
      data: {
        reason: event.reason,
        promise: event.promise
      }
    })
    
    // Prevent default browser error logging for handled cases
    if (event.reason?.name === 'ChunkLoadError') {
      event.preventDefault()
    }
  })
  
  // Global error handler
  window.addEventListener('error', (event) => {
    telemetry.addBreadcrumb({
      category: 'error',
      message: `Global Error: ${event.message}`,
      level: 'error',
      data: {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error
      }
    })
  })
  
  // Network error detection
  window.addEventListener('offline', () => {
    telemetry.addBreadcrumb({
      category: 'api',
      message: 'Network went offline',
      level: 'warning'
    })
  })
  
  window.addEventListener('online', () => {
    telemetry.addBreadcrumb({
      category: 'api',
      message: 'Network came back online',
      level: 'info'
    })
  })
}

// Global type declarations
declare global {
  interface Window {
    Sentry?: {
      withScope: (callback: (scope: any) => void) => void
      captureException: (error: Error) => void
    }
    gtag?: (...args: any[]) => void
    gc?: () => void
    __clearLargeObjects?: () => void
    __appStartTime?: number
  }
}

export default ErrorBoundary