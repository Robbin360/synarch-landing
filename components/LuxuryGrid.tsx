'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface LuxuryGridProps {
  children: React.ReactNode
  className?: string
  columns?: {
    base?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
    '2xl'?: number
  }
  gap?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  align?: 'start' | 'center' | 'end' | 'stretch'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  variant?: 'default' | 'masonry' | 'feature'
  stagger?: boolean
}

const gapClasses = {
  sm: 'gap-6',
  md: 'gap-8',
  lg: 'gap-12',
  xl: 'gap-16',
  '2xl': 'gap-20'
}

const alignClasses = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch'
}

const justifyClasses = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly'
}

function getColumnClasses(columns: LuxuryGridProps['columns'] = {}) {
  const { base = 1, sm, md, lg, xl, '2xl': xl2 } = columns
  
  const classes = [`grid-cols-${base}`]
  
  if (sm) classes.push(`sm:grid-cols-${sm}`)
  if (md) classes.push(`md:grid-cols-${md}`)
  if (lg) classes.push(`lg:grid-cols-${lg}`)
  if (xl) classes.push(`xl:grid-cols-${xl}`)
  if (xl2) classes.push(`2xl:grid-cols-${xl2}`)
  
  return classes.join(' ')
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6
    }
  }
}

export default function LuxuryGrid({
  children,
  className = '',
  columns = { base: 1, md: 2, lg: 3 },
  gap = 'lg',
  align = 'stretch',
  justify = 'start',
  variant = 'default',
  stagger = true
}: LuxuryGridProps) {
  const gridClasses = [
    'grid',
    getColumnClasses(columns),
    gapClasses[gap],
    alignClasses[align],
    justifyClasses[justify],
    variant === 'masonry' ? 'auto-rows-max' : '',
    variant === 'feature' ? 'place-items-center' : '',
    className
  ].filter(Boolean).join(' ')

  if (stagger) {
    return (
      <motion.div
        className={gridClasses}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-10%' }}
      >
        {React.Children.map(children, (child, index) => (
          <motion.div key={index} variants={itemVariants}>
            {child}
          </motion.div>
        ))}
      </motion.div>
    )
  }

  return (
    <div className={gridClasses}>
      {children}
    </div>
  )
}

// Luxury Grid Item Component for additional control
interface LuxuryGridItemProps {
  children: React.ReactNode
  className?: string
  span?: {
    base?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
    '2xl'?: number
  }
  start?: {
    base?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
    '2xl'?: number
  }
}

function getSpanClasses(span: LuxuryGridItemProps['span'] = {}) {
  const { base, sm, md, lg, xl, '2xl': xl2 } = span
  
  const classes = []
  
  if (base) classes.push(`col-span-${base}`)
  if (sm) classes.push(`sm:col-span-${sm}`)
  if (md) classes.push(`md:col-span-${md}`)
  if (lg) classes.push(`lg:col-span-${lg}`)
  if (xl) classes.push(`xl:col-span-${xl}`)
  if (xl2) classes.push(`2xl:col-span-${xl2}`)
  
  return classes.join(' ')
}

function getStartClasses(start: LuxuryGridItemProps['start'] = {}) {
  const { base, sm, md, lg, xl, '2xl': xl2 } = start
  
  const classes = []
  
  if (base) classes.push(`col-start-${base}`)
  if (sm) classes.push(`sm:col-start-${sm}`)
  if (md) classes.push(`md:col-start-${md}`)
  if (lg) classes.push(`lg:col-start-${lg}`)
  if (xl) classes.push(`xl:col-start-${xl}`)
  if (xl2) classes.push(`2xl:col-start-${xl2}`)
  
  return classes.join(' ')
}

export function LuxuryGridItem({
  children,
  className = '',
  span,
  start
}: LuxuryGridItemProps) {
  const itemClasses = [
    getSpanClasses(span),
    getStartClasses(start),
    className
  ].filter(Boolean).join(' ')

  return (
    <div className={itemClasses}>
      {children}
    </div>
  )
}