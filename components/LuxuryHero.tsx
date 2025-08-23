'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import AnimatedButton from '@/components/AnimatedButton'
import LuxuryContainer from '@/components/LuxuryContainer'

export default function LuxuryHero() {
  const shouldReduceMotion = useReducedMotion()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const heroVariants = {
    hidden: { 
      opacity: 0,
      y: 40,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.4, 0, 0.2, 1],
        staggerChildren: 0.2
      }
    }
  }

  const childVariants = {
    hidden: { 
      opacity: 0,
      y: 30
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  }

  const textContent = "Architects of Inevitability."
  
  return (
    <LuxuryContainer variant="hero" className="relative">
      <motion.div
        className="text-center max-w-6xl mx-auto"
        variants={shouldReduceMotion ? {} : heroVariants}
        initial="hidden"
        animate={mounted ? "visible" : "hidden"}
      >
        {/* Main Heading with Luxury Typography */}
        <motion.div
          variants={shouldReduceMotion ? {} : childVariants}
          className="mb-8 md:mb-12"
        >
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight leading-[0.9] text-pure-white luxury-heading">
            {mounted && !shouldReduceMotion ? (
              <TypewriterText text={textContent} />
            ) : (
              textContent
            )}
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          variants={shouldReduceMotion ? {} : childVariants}
          className="mb-12 md:mb-16"
        >
          <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl text-platinum/90 max-w-4xl mx-auto leading-relaxed executive-text">
            We do not predict the future. We build the foundational structures that make it possible.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={shouldReduceMotion ? {} : childVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8"
        >
          <AnimatedButton href="/thesis" variant="primary" size="luxury">
            Explore The Thesis
          </AnimatedButton>
          <AnimatedButton href="/entities" variant="secondary" size="luxury">
            Discover Entities
          </AnimatedButton>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          variants={shouldReduceMotion ? {} : childVariants}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ScrollIndicator />
        </motion.div>
      </motion.div>
    </LuxuryContainer>
  )
}

// Typewriter Effect Component
function TypewriterText({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, 50)
      return () => clearTimeout(timer)
    }
  }, [currentIndex, text])

  return (
    <span>
      {displayText}
      <motion.span
        className="inline-block w-1 h-[1.1em] bg-luxury-gold ml-1"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
      />
    </span>
  )
}

// Scroll Indicator Component
function ScrollIndicator() {
  return (
    <motion.div
      className="flex flex-col items-center text-platinum/60"
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    >
      <span className="text-sm font-mono mb-2 tracking-wider">SCROLL</span>
      <div className="w-px h-8 bg-gradient-to-b from-luxury-gold to-transparent"></div>
    </motion.div>
  )
}