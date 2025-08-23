'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface LuxuryContainerProps {
  children: React.ReactNode
  className?: string
  fullHeight?: boolean
  centered?: boolean
  maxWidth?: 'luxury' | '8xl' | '9xl' | 'full'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'section' | 'hero'
}

const paddingClasses = {
  none: '',
  sm: 'px-6 md:px-12',
  md: 'px-8 md:px-16 lg:px-20',
  lg: 'px-12 md:px-20 lg:px-24 xl:px-32',
  xl: 'px-16 md:px-24 lg:px-32 xl:px-40'
}

const maxWidthClasses = {
  luxury: 'max-w-luxury',
  '8xl': 'max-w-8xl',
  '9xl': 'max-w-9xl',
  full: 'max-w-full'
}

export default function LuxuryContainer({
  children,
  className = '',
  fullHeight = false,
  centered = true,
  maxWidth = 'luxury',
  padding = 'lg',
  variant = 'default'
}: LuxuryContainerProps) {
  const baseClasses = [
    maxWidthClasses[maxWidth],
    centered ? 'mx-auto' : '',
    paddingClasses[padding],
    fullHeight ? 'min-h-screen' : '',
    variant === 'section' ? 'min-h-screen flex items-center justify-center' : '',
    variant === 'hero' ? 'h-screen flex items-center justify-center' : '',
    className
  ].filter(Boolean).join(' ')

  if (variant === 'section' || variant === 'hero') {
    return (
      <motion.section
        className={baseClasses}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        viewport={{ once: true, margin: '-10%' }}
      >
        {children}
      </motion.section>
    )
  }

  return (
    <div className={baseClasses}>
      {children}
    </div>
  )
}