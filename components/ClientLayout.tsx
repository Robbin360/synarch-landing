'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useReducedMotion } from 'framer-motion'

type ClientLayoutProps = {
  children: React.ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname()
  const reduceMotion = useReducedMotion()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={reduceMotion ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 12, filter: 'blur(8px)' }}
        animate={reduceMotion ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={reduceMotion ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: -12, filter: 'blur(8px)' }}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.45, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

