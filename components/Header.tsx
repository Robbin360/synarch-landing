'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import QuickNavButtons from '@/components/QuickNavButtons'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      // Announce to screen readers
      const announcement = `Navigated to ${sectionId} section`
      const ariaLive = document.createElement('div')
      ariaLive.setAttribute('aria-live', 'polite')
      ariaLive.setAttribute('aria-atomic', 'true')
      ariaLive.className = 'sr-only'
      ariaLive.textContent = announcement
      document.body.appendChild(ariaLive)
      setTimeout(() => document.body.removeChild(ariaLive), 1000)
    }
    setIsMenuOpen(false)
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }

    if (isMenuOpen) {
      document.addEventListener('keydown', handleKeyDown)
      // Focus trap for mobile menu
      const focusableElements = mobileMenuRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      if (focusableElements?.length) {
        (focusableElements[0] as HTMLElement).focus()
      }
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMenuOpen])

  return (
    <header
      id="navigation"
      className="fixed top-0 left-0 right-0 z-40 border-b border-white/10 backdrop-blur-sm bg-[#111111]/[0.92]"
      role="banner"
    >
      <div className="flex items-center justify-between px-4 py-3">
        <div className="font-serif text-2xl font-medium tracking-wide">
          <Link 
            href="/" 
            className="synarch-button px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-luxury-gold focus:ring-offset-2 focus:ring-offset-deep-black"
            aria-label="SYNARCH - Go to homepage"
          >
            SYNARCH
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center" role="navigation" aria-label="Primary navigation">
          <div key="desktop-nav">
            <QuickNavButtons />
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          ref={menuButtonRef}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white/80 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-luxury-gold focus:ring-offset-2 focus:ring-offset-deep-black rounded p-1"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-controls="mobile-menu"
          aria-expanded={isMenuOpen}
          aria-haspopup="true"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
          <span className="sr-only">
            {isMenuOpen ? 'Close menu' : 'Open menu'}
          </span>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav 
          ref={mobileMenuRef}
          id="mobile-menu" 
          className="md:hidden mt-4 pb-4 border-t border-white/10 pt-4" 
          role="navigation"
          aria-label="Mobile navigation"
          key="mobile-nav"
        >
          <div className="flex flex-wrap gap-3 px-4" key="mobile-nav-container">
            <QuickNavButtons />
          </div>
        </nav>
      )}
    </header>
  )
} 