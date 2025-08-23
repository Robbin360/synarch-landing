'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface ScrollControllerProps {
  children: React.ReactNode
}

export default function ScrollController({ children }: ScrollControllerProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Initialize luxury scroll experience
    const ctx = gsap.context(() => {
      // Smooth scroll setup for luxury feel
      gsap.set(containerRef.current, { 
        willChange: 'transform',
        backfaceVisibility: 'hidden'
      })

      // Global scroll optimizations
      ScrollTrigger.config({
        autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
        ignoreMobileResize: true
      })

      // Parallax background effects
      gsap.utils.toArray('.parallax-bg').forEach((element: any) => {
        gsap.to(element, {
          yPercent: -50,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        })
      })

      // Luxury reveal animations
      gsap.utils.toArray('.luxury-reveal').forEach((element: any, index) => {
        gsap.fromTo(element, 
          {
            opacity: 0,
            y: 60,
            scale: 0.95
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: element,
              start: "top 80%",
              end: "top 20%",
              toggleActions: "play none none reverse"
            }
          }
        )
      })

      // Staggered grid animations
      gsap.utils.toArray('.luxury-grid').forEach((grid: any) => {
        const items = grid.querySelectorAll('.grid-item')
        gsap.fromTo(items,
          {
            opacity: 0,
            y: 40,
            scale: 0.9
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: grid,
              start: "top 75%",
              toggleActions: "play none none reverse"
            }
          }
        )
      })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="scroll-container">
      {children}
    </div>
  )
}

// Scroll-triggered section animation hook
export function useScrollAnimation(ref: React.RefObject<HTMLElement>, options: {
  start?: string
  end?: string
  scrub?: boolean
  animation?: gsap.TweenVars
}) {
  useEffect(() => {
    if (!ref.current) return

    const element = ref.current
    const { start = "top 80%", end = "top 20%", scrub = false, animation = {} } = options

    const ctx = gsap.context(() => {
      gsap.fromTo(element,
        {
          opacity: 0,
          y: 50,
          ...animation.from
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power4.out",
          ...animation.to,
          scrollTrigger: {
            trigger: element,
            start,
            end,
            scrub,
            toggleActions: "play none none reverse"
          }
        }
      )
    })

    return () => ctx.revert()
  }, [ref, options])
}