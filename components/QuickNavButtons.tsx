'use client'

import AnimatedButton from '@/components/AnimatedButton'

export default function QuickNavButtons() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <AnimatedButton href="/" variant="secondary">SYNARCH</AnimatedButton>
      <AnimatedButton href="/thesis" variant="secondary">Thesis</AnimatedButton>
      <AnimatedButton href="/entities" variant="secondary">Entities</AnimatedButton>
      <AnimatedButton href="/contact" variant="secondary">Contact</AnimatedButton>
    </div>
  )
}

