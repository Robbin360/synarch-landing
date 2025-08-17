'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

type AnimatedButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  href?: string
  variant?: 'primary' | 'secondary'
  className?: string
  loading?: boolean
}

export default function AnimatedButton({
  children,
  onClick,
  href,
  variant = 'primary',
  className = '',
  loading = false,
}: AnimatedButtonProps) {
  const [isPressed, setIsPressed] = useState(false)
  const [pulseKey, setPulseKey] = useState(0)

  const base =
    'relative inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm md:text-base tracking-wide transition-colors duration-200'
  const palette =
    variant === 'primary'
      ? 'text-white bg-white/5 hover:bg-white/10'
      : 'text-white/80 bg-white/0 hover:bg-white/10'

  const content = (
    <motion.span
      initial={{ filter: 'brightness(1)', textShadow: '0 0 0px rgba(123, 97, 255, 0)' }}
      whileHover={{
        textShadow: '0 0 12px rgba(123, 97, 255, 0.6), 0 0 24px rgba(92, 164, 255, 0.4)',
      }}
      animate={{
        scale: isPressed ? 0.98 : 1,
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className="relative z-10"
    >
      {children}
    </motion.span>
  )

  const ButtonCore = (
    <motion.button
      type="button"
      whileTap={{ scale: 0.98 }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onClick={() => {
        setPulseKey((k) => k + 1)
        onClick?.()
      }}
      className={`${base} ${palette} ${className}`}
      aria-busy={loading || undefined}
    >
      {/* Glow layers */}
      <motion.span
        className="absolute inset-0 rounded-lg"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        style={{
          background:
            'radial-gradient(40% 40% at 50% 50%, rgba(146, 97, 255, 0.25) 0%, rgba(146, 97, 255, 0.0) 100%)',
        }}
      />
      <motion.span
        className="absolute inset-0 rounded-lg"
        animate={{
          boxShadow: loading
            ? [
                '0 0 0px rgba(146,97,255,0.0)',
                '0 0 22px rgba(146,97,255,0.35)',
                '0 0 0px rgba(146,97,255,0.0)',
              ]
            : '0 0 0px rgba(0,0,0,0)',
        }}
        transition={{ duration: loading ? 1.2 : 0.2, repeat: loading ? Infinity : 0 }}
      />
      {/* Click pulse */}
      <motion.span
        key={pulseKey}
        className="absolute inset-0 rounded-lg"
        initial={{ opacity: 0.35, scale: 0 }}
        animate={{ opacity: 0, scale: 1.6 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          background:
            'radial-gradient(35% 35% at 50% 50%, rgba(146, 97, 255, 0.35) 0%, rgba(146, 97, 255, 0.0) 100%)',
        }}
      />
      {/* Loading orbiting particles */}
      {loading && (
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
      )}
      {content}
    </motion.button>
  )

  if (href) {
    return (
      <a href={href} className="inline-block">
        {ButtonCore}
      </a>
    )
  }

  return ButtonCore
}