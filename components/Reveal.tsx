'use client'

import { motion, useAnimation, Variants } from 'framer-motion'
import { useEffect, useRef } from 'react'

type RevealProps = {
  children: React.ReactNode
  className?: string
  delay?: number
}

const variants: Variants = {
  hidden: { opacity: 0, y: 16, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

export default function Reveal({ children, className = '', delay = 0 }: RevealProps) {
  const controls = useAnimation()
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            controls.start('visible')
          }
        })
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [controls])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

