'use client'

import AnimatedButton from '@/components/AnimatedButton'
import { usePathname } from 'next/navigation'

export default function QuickNavButtons() {
  const pathname = usePathname()
  
  return (
    <div 
      className="flex flex-wrap items-center justify-center gap-3" 
      data-testid="quick-nav"
      key={`nav-container-${pathname}`}
    >
      <AnimatedButton key="nav-home" href="/" variant="secondary" className="nav-link">SYNARCH</AnimatedButton>
      <AnimatedButton key="nav-thesis" href="/thesis" variant="secondary" className="nav-link">Thesis</AnimatedButton>
      <AnimatedButton key="nav-entities" href="/entities" variant="secondary" className="nav-link">Entities</AnimatedButton>
      <AnimatedButton key="nav-contact" href="/contact" variant="secondary" className="nav-link">Contact</AnimatedButton>
    </div>
  )
}

