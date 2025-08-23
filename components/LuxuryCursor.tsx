'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'

interface CursorState {
  x: number
  y: number
  isVisible: boolean
  isInteracting: boolean
  cursorType: 'default' | 'interactive' | 'text' | 'magnetic'
}

export default function LuxuryCursor() {
  const [cursorState, setCursorState] = useState<CursorState>({
    x: 0,
    y: 0,
    isVisible: false,
    isInteracting: false,
    cursorType: 'default'
  })

  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  
  // Smooth cursor movement with spring physics
  const springX = useSpring(cursorX, { stiffness: 200, damping: 20 })
  const springY = useSpring(cursorY, { stiffness: 200, damping: 20 })

  // Inner cursor (dot)
  const innerCursorX = useSpring(cursorX, { stiffness: 400, damping: 25 })
  const innerCursorY = useSpring(cursorY, { stiffness: 400, damping: 25 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      
      setCursorState(prev => ({
        ...prev,
        x: e.clientX,
        y: e.clientY,
        isVisible: true
      }))
    }

    const handleMouseEnter = () => {
      setCursorState(prev => ({ ...prev, isVisible: true }))
    }

    const handleMouseLeave = () => {
      setCursorState(prev => ({ ...prev, isVisible: false }))
    }

    // Interactive element detection
    const handleInteractiveEnter = (e: Event) => {
      const target = e.target as HTMLElement
      const rect = target.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      // Magnetic effect
      cursorX.set(centerX)
      cursorY.set(centerY)
      
      setCursorState(prev => ({ 
        ...prev, 
        isInteracting: true,
        cursorType: target.dataset.cursorType as any || 'interactive'
      }))
    }

    const handleInteractiveLeave = () => {
      setCursorState(prev => ({ 
        ...prev, 
        isInteracting: false,
        cursorType: 'default'
      }))
    }

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)

    // Interactive elements
    const interactiveElements = document.querySelectorAll(
      'button, a, [data-cursor="interactive"], [data-cursor="magnetic"], .luxury-hover, .synarch-button'
    )

    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleInteractiveEnter)
      el.addEventListener('mouseleave', handleInteractiveLeave)
    })

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleInteractiveEnter)
        el.removeEventListener('mouseleave', handleInteractiveLeave)
      })
    }
  }, [cursorX, cursorY])

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

  if (typeof window === 'undefined') return null

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
            style={{
              borderColor: getCursorColor(),
              transform: 'translate(-50%, -50%)'
            }}
          />

          {/* Inner cursor dot */}
          <motion.div
            style={{
              x: innerCursorX,
              y: innerCursorY,
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
            style={{
              backgroundColor: getCursorColor(),
              transform: 'translate(-50%, -50%)'
            }}
          />

          {/* Interaction indicator */}
          {cursorState.isInteracting && (
            <motion.div
              style={{
                x: springX,
                y: springY,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.4 }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="absolute w-20 h-20 rounded-full"
              style={{
                background: `radial-gradient(circle, ${getCursorColor()} 0%, transparent 70%)`,
                transform: 'translate(-50%, -50%)'
              }}
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