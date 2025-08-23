'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface ParallaxLayerProps {
  children: React.ReactNode
  speed?: number
  className?: string
  direction?: 'up' | 'down'
}

export function ParallaxLayer({ 
  children, 
  speed = 0.5, 
  className = '', 
  direction = 'up' 
}: ParallaxLayerProps) {
  const layerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!layerRef.current) return

    const ctx = gsap.context(() => {
      const yPercent = direction === 'up' ? -50 * speed : 50 * speed
      
      gsap.to(layerRef.current, {
        yPercent,
        ease: "none",
        scrollTrigger: {
          trigger: layerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      })
    }, layerRef)

    return () => ctx.revert()
  }, [speed, direction])

  return (
    <div ref={layerRef} className={`parallax-layer ${className}`}>
      {children}
    </div>
  )
}

interface ParallaxContainerProps {
  children: React.ReactNode
  className?: string
}

export default function ParallaxContainer({ children, className = '' }: ParallaxContainerProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {children}
    </div>
  )
}