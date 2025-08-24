'use client'

import { useEffect } from 'react'
import { setupGlobalErrorHandling } from '@/components/ErrorBoundary'
import { AccessibilityManager } from '@/components/AccessibilityManager'

export default function ClientInitializer() {
  useEffect(() => {
    // Initialize global error handling and performance monitoring
    setupGlobalErrorHandling()
    
    // Initialize accessibility manager
    const accessibilityManager = AccessibilityManager.getInstance()
    accessibilityManager.initialize()
    
    // Mark app start time for performance calculations
    if (!window.__appStartTime) {
      window.__appStartTime = Date.now()
    }
  }, [])

  return null // This component doesn't render anything
}