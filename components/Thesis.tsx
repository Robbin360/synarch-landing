'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import Container from '@/components/Container'
import ScrollNarrative from '@/components/ScrollNarrative'
import { ParallaxLayer } from '@/components/ParallaxEffects'
import AnimatedButton from '@/components/AnimatedButton'

export default function Thesis() {
  const shouldReduceMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)

  const narrativeVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  }

  const paragraphVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.98
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1
      }
    }
  }

  return (
    <Container className="narrative-section">
      <ScrollNarrative>
        <div ref={containerRef} className="max-w-6xl mx-auto text-center">
          {/* Background Elements */}
          <ParallaxLayer speed={0.3} className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-luxury-gold/5 rounded-full blur-3xl" />
          </ParallaxLayer>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true, margin: '-20%' }}
            className="mb-20"
          >
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight leading-[0.9] text-pure-white luxury-heading mb-6">
              The Synarch
              <span className="block bg-gradient-to-r from-luxury-gold to-electric-blue bg-clip-text text-transparent">
                Thesis
              </span>
            </h2>
            <div className="w-24 h-px bg-luxury-gold mx-auto" />
          </motion.div>

          {/* Narrative Content */}
          <motion.div
            variants={shouldReduceMotion ? {} : narrativeVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10%' }}
            className="max-w-4xl mx-auto space-y-16"
          >
            <motion.div
              variants={shouldReduceMotion ? {} : paragraphVariants}
              className="reveal-text"
            >
              <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-platinum/90 executive-text font-light">
                In an era of exponential technological advancement, the distinction between 
                <span className="text-luxury-gold font-medium"> prediction and creation </span>
                has blurred.
              </p>
            </motion.div>

            <motion.div
              variants={shouldReduceMotion ? {} : paragraphVariants}
              className="reveal-text"
            >
              <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-platinum/80 executive-text">
                Traditional forecasting methods fail because they attempt to extrapolate from existing paradigms. 
                We operate differently. We identify the fundamental constraints that shape reality and 
                <span className="text-electric-blue font-medium"> systematically remove them</span>.
              </p>
            </motion.div>

            <motion.div
              variants={shouldReduceMotion ? {} : paragraphVariants}
              className="reveal-text"
            >
              <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-platinum/80 executive-text">
                Our approach is not about predicting which technologies will succeed, but about 
                <span className="text-luxury-gold font-medium"> creating the conditions </span>
                where certain outcomes become inevitable.
              </p>
            </motion.div>

            <motion.div
              variants={shouldReduceMotion ? {} : paragraphVariants}
              className="reveal-text pt-8"
            >
              <p className="text-2xl md:text-3xl lg:text-4xl font-light text-pure-white luxury-subheading">
                We are not futurists—we are 
                <span className="bg-gradient-to-r from-luxury-gold via-electric-blue to-luxury-gold bg-clip-text text-transparent font-medium">
                  architects of the possible
                </span>.
              </p>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              variants={shouldReduceMotion ? {} : paragraphVariants}
              className="reveal-text pt-12"
            >
              <AnimatedButton 
                href="/manifesto" 
                variant="luxury" 
                size="lg"
                className="inline-flex items-center gap-3"
              >
                Read the Full Manifesto
                <span className="text-lg">→</span>
              </AnimatedButton>
            </motion.div>
          </motion.div>
        </div>
      </ScrollNarrative>
    </LuxuryContainer>
  )
} 