'use client'

import AnimatedButton from '@/components/AnimatedButton'

export default function QuickNavButtons() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3" data-testid="quick-nav">
      <AnimatedButton href="/" variant="secondary" className="nav-link">SYNARCH</AnimatedButton>
      <AnimatedButton href="/thesis" variant="secondary" className="nav-link">Thesis</AnimatedButton>
      <AnimatedButton href="/entities" variant="secondary" className="nav-link">Entities</AnimatedButton>
      <AnimatedButton href="/contact" variant="secondary" className="nav-link">Contact</AnimatedButton>
    </div>
  )
}

