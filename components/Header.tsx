'use client'

import { useState } from 'react'
import Link from 'next/link'
import QuickNavButtons from '@/components/QuickNavButtons'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#111111]/95 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="font-serif text-2xl font-medium tracking-wide">
            <Link href="/" className="synarch-button px-2 py-1 rounded">
              SYNARCH
            </Link>
          </div>

          {/* Desktop Navigation (reuse bottom buttons) */}
          <nav className="hidden md:flex items-center" role="navigation" aria-label="Primary">
            <QuickNavButtons />
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white/80 hover:text-white transition-colors duration-200"
            aria-label="Toggle menu"
            aria-controls="mobile-menu"
            aria-expanded={isMenuOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation (reuse bottom buttons) */}
        {isMenuOpen && (
          <nav id="mobile-menu" className="md:hidden mt-4 pb-4 border-t border-white/10 pt-4" role="navigation">
            <div className="flex flex-wrap gap-3">
              <QuickNavButtons />
            </div>
          </nav>
        )}
      </div>
    </header>
  )
} 