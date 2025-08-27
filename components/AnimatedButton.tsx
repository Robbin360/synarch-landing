'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'

type AnimatedButtonProps = {
  children: React.ReactNode
  onClick?: (e?: React.MouseEvent) => void
  href?: string | URL
  variant?: 'primary' | 'secondary' | 'luxury' | 'ghost'
  size?: 'sm' | 'md' | 'lg' | 'luxury'
  type?: 'button' | 'submit' | 'reset'
  className?: string
  loading?: boolean
}

export default function AnimatedButton({
  children,
  onClick,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  loading = false,
  type = 'button',
}: AnimatedButtonProps) {
  const [isPressed, setIsPressed] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [pulseKey, setPulseKey] = useState(0)
  const reduceMotion = useReducedMotion()

  // Size variants for luxury experience
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm md:text-base',
    lg: 'px-8 py-4 text-base md:text-lg',
    luxury: 'px-12 py-5 text-lg md:text-xl'
  }

  const base = `relative inline-flex items-center justify-center rounded-lg tracking-wide transition-all duration-300 will-change-transform transform-gpu ${sizeClasses[size]}`

  // Luxury color palettes
  const variantStyles = {
    primary: 'text-pure-white bg-luxury-gold/20 border border-luxury-gold/30 hover:bg-luxury-gold/30 hover:border-luxury-gold/50 hover:shadow-gold-glow',
    secondary: 'text-white bg-charcoal/60 border border-white/30 hover:bg-charcoal/80 hover:border-white/50 hover:shadow-luxury hover:text-luxury-gold',
    luxury: 'text-deep-black bg-luxury-gold border border-luxury-gold hover:bg-luxury-gold/90 hover:shadow-gold-glow',
    ghost: 'text-white bg-transparent border border-white/40 hover:bg-white/10 hover:border-white/60 hover:text-luxury-gold'
  }

  const content = (
    <motion.span
      initial={{ filter: 'brightness(1)' }}
      whileHover={reduceMotion ? undefined : {
        filter: variant === 'luxury' ? 'brightness(1.1)' : 'brightness(1.2)',
        textShadow: variant === 'luxury' 
          ? '0 0 8px rgba(212, 175, 55, 0.8)' 
          : '0 0 12px rgba(255, 255, 255, 0.3)'
      }}
      animate={reduceMotion ? { scale: 1 } : { scale: isPressed ? 0.98 : 1 }}
      transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 400, damping: 30 }}
      className="relative z-10 font-medium"
    >
      {children}
    </motion.span>
  )

  const handleClick = (e?: React.MouseEvent) => {
    setPulseKey((k: number) => k + 1)
    setClicked(true)
    setTimeout(() => setClicked(false), 600)
    onClick?.(e)
  }

  // Shared visual effects for both button and link
  const renderVisualEffects = (isLink = false) => (
    <>
      {/* Luxury background glow */}
      <motion.span
        className="absolute inset-0 rounded-lg opacity-0"
        whileHover={reduceMotion ? undefined : { opacity: 1 }}
        style={{
          background: isLink
            ? 'radial-gradient(40% 40% at 50% 50%, rgba(146, 97, 255, 0.25) 0%, rgba(146, 97, 255, 0.0) 100%)'
            : variant === 'luxury' 
              ? 'radial-gradient(50% 50% at 50% 50%, rgba(212, 175, 55, 0.3) 0%, transparent 100%)'
              : 'radial-gradient(50% 50% at 50% 50%, rgba(0, 212, 255, 0.15) 0%, transparent 100%)',
        }}
      />

      {/* Shine effect */}
      <motion.span
        className="absolute inset-0 rounded-lg overflow-hidden"
        initial={{ x: '-100%' }}
        whileHover={reduceMotion ? undefined : {
          x: '100%',
          transition: { duration: 0.6, ease: 'easeInOut' }
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
      </motion.span>

      {/* Enhanced pulse effect */}
      {!reduceMotion && (
        <motion.span
          key={pulseKey}
          className="absolute inset-0 rounded-lg"
          initial={{ opacity: isLink ? 0.35 : 0.5, scale: isLink ? 0 : 0.8 }}
          animate={{ opacity: 0, scale: isLink ? 1.6 : 2 }}
          transition={{ duration: isLink ? 0.6 : 0.8, ease: 'easeOut' }}
          style={{
            background: isLink
              ? 'radial-gradient(35% 35% at 50% 50%, rgba(146, 97, 255, 0.35) 0%, rgba(146, 97, 255, 0.0) 100%)'
              : variant === 'luxury'
                ? 'radial-gradient(40% 40% at 50% 50%, rgba(212, 175, 55, 0.4) 0%, transparent 100%)'
                : 'radial-gradient(40% 40% at 50% 50%, rgba(0, 212, 255, 0.3) 0%, transparent 100%)',
          }}
        />
      )}

      {/* Loading state */}
      {loading && !reduceMotion && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {isLink ? (
            <motion.span
              className="pointer-events-none absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, rotate: 360 }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
            >
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[calc(50%+12px)] w-1.5 h-1.5 rounded-full"
                style={{ background: 'linear-gradient(180deg, #8e5cff, #5b7cfa)' }} />
              <span className="absolute left-[calc(50%+10px)] top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
                style={{ background: 'linear-gradient(180deg, #5b7cfa, #8e5cff)' }} />
              <span className="absolute left-[calc(50%-10px)] top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
                style={{ background: 'linear-gradient(180deg, #7e6bff, #6aa6ff)' }} />
            </motion.span>
          ) : (
            <motion.div
              className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
          )}
        </motion.div>
      )}
    </>
  )

  const ButtonCore = (
    <motion.button
      type={type}
      whileTap={reduceMotion ? undefined : { scale: 0.96 }}
      whileHover={reduceMotion ? undefined : { 
        y: -2,
        transition: { duration: 0.2, ease: 'easeOut' }
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onClick={handleClick}
      className={`${base} ${variantStyles[variant]} synarch-button luxury-hover ${clicked ? 'clicked' : ''} ${className}`}
      aria-busy={loading || undefined}
    >
      {renderVisualEffects()}
      {!loading && content}
    </motion.button>
  )

  if (href) {
    return (
      <Link href={href} legacyBehavior passHref>
        <motion.a
          whileTap={reduceMotion ? undefined : { scale: 0.98 }}
          onMouseDown={() => setIsPressed(true)}
          onMouseUp={() => setIsPressed(false)}
          onMouseLeave={() => setIsPressed(false)}
          onClick={handleClick}
          className={`${base} ${variantStyles[variant]} synarch-button ${clicked ? 'clicked' : ''} ${className}`}
          aria-busy={loading || undefined}
          role="link"
          aria-label={typeof children === 'string' ? children : undefined}
        >
          {renderVisualEffects(true)}
          {/* Additional link-specific animations */}
          <motion.span
            className="absolute inset-0 rounded-lg"
            animate={reduceMotion ? { boxShadow: '0 0 0px rgba(0,0,0,0)' } : {
              boxShadow: loading
                ? [
                    '0 0 0px rgba(146,97,255,0.0)',
                    '0 0 22px rgba(146,97,255,0.35)',
                    '0 0 0px rgba(146,97,255,0.0)',
                  ]
                : '0 0 0px rgba(0,0,0,0)',
            }}
            transition={reduceMotion ? { duration: 0 } : { duration: loading ? 1.2 : 0.2, repeat: loading ? Infinity : 0 }}
          />
          {content}
        </motion.a>
      </Link>
    )
  }

  return ButtonCore
}