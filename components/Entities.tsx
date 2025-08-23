'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import LuxuryContainer from '@/components/LuxuryContainer'
import LuxuryGrid from '@/components/LuxuryGrid'
import ScrollNarrative from '@/components/ScrollNarrative'
import { ParallaxLayer } from '@/components/ParallaxEffects'
import AnimatedButton from '@/components/AnimatedButton'

interface EntityCardProps {
  title: string
  description: string
  accent: 'gold' | 'blue'
  index: number
}

function EntityCard({ title, description, accent, index }: EntityCardProps) {
  const shouldReduceMotion = useReducedMotion()
  
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.9,
      rotateX: 15
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 1,
        delay: index * 0.2,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  }

  const hoverVariants = {
    hover: {
      y: -8,
      scale: 1.02,
      rotateY: 2,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  }

  const accentColors = {
    gold: {
      border: 'border-luxury-gold/30',
      glow: 'hover:shadow-gold-glow',
      accent: 'text-luxury-gold',
      gradient: 'from-luxury-gold/20 to-transparent'
    },
    blue: {
      border: 'border-electric-blue/30',
      glow: 'hover:shadow-electric-glow',
      accent: 'text-electric-blue',
      gradient: 'from-electric-blue/20 to-transparent'
    }
  }

  return (
    <motion.div
      variants={shouldReduceMotion ? {} : cardVariants}
      whileHover={shouldReduceMotion ? {} : "hover"}
      className="grid-item"
    >
      <motion.div
        variants={shouldReduceMotion ? {} : hoverVariants}
        className={`luxury-card relative h-full p-8 md:p-10 lg:p-12 rounded-2xl bg-charcoal/80 backdrop-blur-luxury border ${accentColors[accent].border} ${accentColors[accent].glow} transition-all duration-500 group overflow-hidden`}
        style={{
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Geometric Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${accentColors[accent].gradient} transform rotate-45 translate-x-16 -translate-y-16`} />
          <div className={`absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr ${accentColors[accent].gradient} transform -rotate-45 -translate-x-12 translate-y-12`} />
        </div>

        {/* Hover Glow Effect */}
        <div className={`absolute inset-0 bg-gradient-to-br ${accentColors[accent].gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />

        {/* Content */}
        <div className="relative z-10">
          {/* Entity Title */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-2 h-16 bg-gradient-to-b ${accentColors[accent].gradient.replace('to-transparent', `to-${accent === 'gold' ? 'luxury-gold' : 'electric-blue'}/50`)}`} />
              <h3 className={`font-serif text-3xl md:text-4xl lg:text-5xl font-light tracking-tight luxury-subheading ${accentColors[accent].accent}`}>
                {title}
              </h3>
            </div>
            <div className={`w-20 h-px bg-${accent === 'gold' ? 'luxury-gold' : 'electric-blue'}/50`} />
          </motion.div>

          {/* Entity Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 + 0.5 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl leading-relaxed text-platinum/90 executive-text mb-8"
          >
            {description}
          </motion.p>

          {/* Learn More Link */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: index * 0.1 + 0.7 }}
            viewport={{ once: true }}
          >
            <AnimatedButton
              href={`/${title.toLowerCase()}`}
              variant="ghost"
              size="sm"
              className="group-hover:border-current transition-colors duration-300"
            >
              Explore {title}
              <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
            </AnimatedButton>
          </motion.div>
        </div>

        {/* 3D Geometric Accent */}
        <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
          <div className={`w-12 h-12 border-2 border-${accent === 'gold' ? 'luxury-gold' : 'electric-blue'}/50 transform rotate-45`} />
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Entities() {
  const shouldReduceMotion = useReducedMotion()
  
  const entities = [
    {
      title: "NOEMA",
      description: "Our research and development arm focused on fundamental breakthroughs in artificial intelligence, quantum computing, and synthetic biology. NOEMA operates at the intersection of theoretical physics and practical engineering, creating the foundational technologies that will define the next century.",
      accent: "gold" as const
    },
    {
      title: "FULCRUM",
      description: "Our strategic investment and deployment platform that identifies and accelerates the most promising deep-tech ventures. FULCRUM provides not just capital, but the institutional knowledge, strategic guidance, and operational support needed to transform breakthrough science into world-changing technologies.",
      accent: "blue" as const
    }
  ]

  return (
    <LuxuryContainer variant="section" className="narrative-section luxury-reveal">
      <ScrollNarrative>
        <div className="max-w-7xl mx-auto">
          {/* Background Elements */}
          <ParallaxLayer speed={0.2} className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-luxury-gold/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-electric-blue/5 rounded-full blur-3xl" />
          </ParallaxLayer>

          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
            viewport={{ once: true, margin: '-20%' }}
            className="text-center mb-20"
          >
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight leading-[0.9] text-pure-white luxury-heading mb-6">
              Our Operating
              <span className="block bg-gradient-to-r from-luxury-gold via-electric-blue to-luxury-gold bg-clip-text text-transparent">
                Entities
              </span>
            </h2>
            <div className="w-24 h-px bg-gradient-to-r from-luxury-gold to-electric-blue mx-auto" />
            <p className="text-xl md:text-2xl text-platinum/80 max-w-3xl mx-auto mt-8 executive-text">
              Strategic divisions engineered for technological dominance
            </p>
          </motion.div>

          {/* Entities Grid */}
          <LuxuryGrid
            columns={{ base: 1, lg: 2 }}
            gap="xl"
            className="luxury-grid max-w-6xl mx-auto"
            stagger={!shouldReduceMotion}
          >
            {entities.map((entity, index) => (
              <EntityCard
                key={entity.title}
                title={entity.title}
                description={entity.description}
                accent={entity.accent}
                index={index}
              />
            ))}
          </LuxuryGrid>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-20"
          >
            <AnimatedButton
              href="/entities"
              variant="luxury"
              size="lg"
            >
              Explore All Entities
            </AnimatedButton>
          </motion.div>
        </div>
      </ScrollNarrative>
    </LuxuryContainer>
  )
} 