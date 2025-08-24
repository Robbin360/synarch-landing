'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence, useReducedMotion } from 'framer-motion'

interface CursorState {
  x: number
  y: number
  isVisible: boolean
  isInteracting: boolean
  cursorType: 'default' | 'interactive' | 'text' | 'magnetic'
}

// Throttle utility for better performance
function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null
  let lastExecTime = 0
  
  return (...args: Parameters<T>) => {
    const currentTime = Date.now()
    
    if (currentTime - lastExecTime > delay) {
      func(...args)
      lastExecTime = currentTime
    } else {
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        func(...args)
        lastExecTime = Date.now()
      }, delay - (currentTime - lastExecTime))
    }
  }
}

interface CursorState {
  x: number
  y: number
  isVisible: boolean
  isInteracting: boolean
  cursorType: 'default' | 'interactive' | 'text' | 'magnetic'
}

export default function LuxuryCursor() {
  const reduceMotion = useReducedMotion()
  const [cursorState, setCursorState] = useState<CursorState>({
    x: 0,
    y: 0,
    isVisible: false,
    isInteracting: false,
    cursorType: 'default'
  })

  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  
  // Smooth cursor movement with spring physics (disabled if reduced motion)
  const springConfig = reduceMotion 
    ? { stiffness: 1000, damping: 100 } 
    : { stiffness: 200, damping: 20 }
    
  const springX = useSpring(cursorX, springConfig)
  const springY = useSpring(cursorY, springConfig)

  // Inner cursor (dot) with faster response
  const innerCursorX = useSpring(cursorX, reduceMotion 
    ? { stiffness: 1000, damping: 100 }
    : { stiffness: 400, damping: 25 }
  )
  const innerCursorY = useSpring(cursorY, reduceMotion 
    ? { stiffness: 1000, damping: 100 }
    : { stiffness: 400, damping: 25 }
  )

  // Memoized event handlers for better performance
  const handleMouseMove = useCallback(throttle((e: MouseEvent) => {
    cursorX.set(e.clientX)
    cursorY.set(e.clientY)
    
    setCursorState(prev => ({
      ...prev,
      x: e.clientX,
      y: e.clientY,
      isVisible: true
    }))
  }, 16), [cursorX, cursorY]) // ~60fps

  const handleMouseEnter = useCallback(() => {
    setCursorState(prev => ({ ...prev, isVisible: true }))
  }, [])

  const handleMouseLeave = useCallback(() => {
    setCursorState(prev => ({ ...prev, isVisible: false }))
  }, [])

  // Interactive element detection with improved magnetic effect
  const handleInteractiveEnter = useCallback((e: Event) => {
    const target = e.target as HTMLElement
    
    // Only apply magnetic effect if not in reduced motion mode
    if (!reduceMotion) {
      const rect = target.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      // Magnetic effect
      cursorX.set(centerX)
      cursorY.set(centerY)
    }
    
    setCursorState(prev => ({ 
      ...prev, 
      isInteracting: true,
      cursorType: target.dataset.cursorType as any || 'interactive'
    }))
  }, [cursorX, cursorY, reduceMotion])

  const handleInteractiveLeave = useCallback(() => {
    setCursorState(prev => ({ 
      ...prev, 
      isInteracting: false,
      cursorType: 'default'
    }))
  }, [])

  useEffect(() => {
    // Skip cursor functionality in reduced motion mode
    if (reduceMotion) return

    // Add event listeners with passive option for better performance
    const addEventListenerOptions = { passive: true }
    
    document.addEventListener('mousemove', handleMouseMove as any, addEventListenerOptions)
    document.addEventListener('mouseenter', handleMouseEnter, addEventListenerOptions)
    document.addEventListener('mouseleave', handleMouseLeave, addEventListenerOptions)

    // Interactive elements - use more specific selector for better performance
    let interactiveElements: NodeListOf<Element>
    try {
      interactiveElements = document.querySelectorAll(
        'button:not([disabled]), a[href], [data-cursor], .luxury-hover, .synarch-button, [role="button"]'
      )
    } catch {
      // Fallback for older browsers
      interactiveElements = document.querySelectorAll(
        'button, a, [data-cursor], .luxury-hover, .synarch-button'
      )
    }

    // Store cleanup functions for better memory management
    const cleanupFunctions: (() => void)[] = []

    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleInteractiveEnter, addEventListenerOptions)
      el.addEventListener('mouseleave', handleInteractiveLeave, addEventListenerOptions)
      
      cleanupFunctions.push(() => {
        el.removeEventListener('mouseenter', handleInteractiveEnter as any)
        el.removeEventListener('mouseleave', handleInteractiveLeave as any)
      })
    })

    return () => {
      document.removeEventListener('mousemove', handleMouseMove as any)
      document.removeEventListener('mouseenter', handleMouseEnter as any)
      document.removeEventListener('mouseleave', handleMouseLeave as any)
      
      // Execute all cleanup functions
      cleanupFunctions.forEach(cleanup => cleanup())
    }
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave, handleInteractiveEnter, handleInteractiveLeave, reduceMotion])

  // Hide default cursor
  useEffect(() => {
    document.body.style.cursor = 'none'
    return () => {
      document.body.style.cursor = 'auto'
    }
  }, [])

  const getCursorSize = () => {
    switch (cursorState.cursorType) {
      case 'interactive':
        return { width: 60, height: 60 }
      case 'magnetic':
        return { width: 80, height: 80 }
      case 'text':
        return { width: 40, height: 40 }
      default:
        return { width: 40, height: 40 }
    }
  }

  const getCursorColor = () => {
    switch (cursorState.cursorType) {
      case 'interactive':
        return 'rgba(212, 175, 55, 0.8)' // luxury-gold
      case 'magnetic':
        return 'rgba(0, 212, 255, 0.6)' // electric-blue
      default:
        return 'rgba(229, 229, 229, 0.6)' // platinum
    }
  }

  // Don't render cursor on mobile devices or when reduced motion is preferred
  if (typeof window === 'undefined' || reduceMotion) return null

  // Also hide on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null

  return (
    <AnimatePresence>
      {cursorState.isVisible && (
        <div className="pointer-events-none fixed inset-0 z-50 mix-blend-difference">
          {/* Outer cursor ring */}
          <motion.div
            style={{
              x: springX,
              y: springY,
              width: getCursorSize().width,
              height: getCursorSize().height,
              borderColor: getCursorColor(),
              transform: 'translate(-50%, -50%)'
            }}
            animate={{
              scale: cursorState.isInteracting ? 1.5 : 1,
              opacity: cursorState.isInteracting ? 0.8 : 0.6,
            }}
            transition={{
              scale: { duration: 0.2, ease: 'easeOut' },
              opacity: { duration: 0.2 }
            }}
            className="absolute rounded-full border border-current"
          />

          {/* Inner cursor dot */}
          <motion.div
            style={{
              x: innerCursorX,
              y: innerCursorY,
              backgroundColor: getCursorColor(),
              transform: 'translate(-50%, -50%)'
            }}
            animate={{
              scale: cursorState.isInteracting ? 0.5 : 1,
              opacity: cursorState.isInteracting ? 1 : 0.8,
            }}
            transition={{
              scale: { duration: 0.15, ease: 'easeOut' },
              opacity: { duration: 0.15 }
            }}
            className="absolute w-2 h-2 rounded-full"
          />

          {/* Interaction indicator */}
          {cursorState.isInteracting && (
            <motion.div
              style={{
                x: springX,
                y: springY,
                background: `radial-gradient(circle, ${getCursorColor()} 0%, transparent 70%)`,
                transform: 'translate(-50%, -50%)'
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.4 }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="absolute w-20 h-20 rounded-full"
            />
          )}
        </div>
      )}
    </AnimatePresence>
  )
}

// Hook for components to interact with cursor
export function useCursorInteraction() {
  const setInteractive = (element: HTMLElement | null, type: 'interactive' | 'magnetic' | 'text' = 'interactive') => {
    if (element) {
      element.dataset.cursorType = type
    }
  }

  return { setInteractive }
}