'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface ScrollNarrativeProps {
  children: React.ReactNode
  className?: string
}

export default function ScrollNarrative({ children, className = '' }: ScrollNarrativeProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray('.narrative-section')
      
      sections.forEach((section: any, index) => {
        // Cinematic entrance animation
        gsap.fromTo(section, 
          {
            opacity: 0,
            scale: 0.95,
            y: 100
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.5,
            ease: "power4.out",
            scrollTrigger: {
              trigger: section,
              start: "top 70%",
              end: "top 30%",
              toggleActions: "play none none reverse"
            }
          }
        )

        // Text reveal animations
        const textElements = section.querySelectorAll('.reveal-text')
        textElements.forEach((text: any, textIndex: number) => {
          gsap.fromTo(text,
            {
              opacity: 0,
              y: 30
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: textIndex * 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: text,
                start: "top 80%",
                toggleActions: "play none none reverse"
              }
            }
          )
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className={`scroll-narrative ${className}`}>
      {children}
    </div>
  )
}