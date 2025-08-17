'use client'

import { useState } from 'react'
import Link from 'next/link'

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
            SYNARCH
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" role="navigation" aria-label="Primary">
            <Link href="/thesis" className="text-white/80 hover:text-white transition-colors duration-200 text-sm tracking-wide">
              Thesis
            </Link>
            <div className="text-white/40">|</div>
            <Link href="/entities" className="text-white/80 hover:text-white transition-colors duration-200 text-sm tracking-wide">
              Entities
            </Link>
            <div className="text-white/40">|</div>
            <Link href="/contact" className="text-white/80 hover:text-white transition-colors duration-200 text-sm tracking-wide">
              Contact
            </Link>
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

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav id="mobile-menu" className="md:hidden mt-4 pb-4 border-t border-white/10 pt-4" role="navigation">
            <div className="flex flex-col space-y-4">
              <Link href="/thesis" className="text-white/80 hover:text-white transition-colors duration-200 text-sm tracking-wide">
                Thesis
              </Link>
              <Link href="/entities" className="text-white/80 hover:text-white transition-colors duration-200 text-sm tracking-wide">
                Entities
              </Link>
              <Link href="/contact" className="text-white/80 hover:text-white transition-colors duration-200 text-sm tracking-wide">
                Contact
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
} 