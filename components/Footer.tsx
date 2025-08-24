import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer 
      className="border-t border-white/10 pt-12 pb-8 px-6"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="font-serif text-lg tracking-wide">
            <span aria-label="SYNARCH logo">SYNARCH</span>
            <span className="sr-only">- Architects of Inevitability</span>
          </div>
          
          <nav 
            className="flex items-center space-x-6 text-sm md:justify-end" 
            role="navigation" 
            aria-label="Legal navigation"
          >
            <Link 
              href="/privacy" 
              className="text-white/60 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-luxury-gold focus:ring-offset-2 focus:ring-offset-deep-black rounded px-1"
            >
              Privacy Policy
            </Link>
            
            <div className="text-white/40" aria-hidden="true">|</div>
            
            <Link 
              href="/terms" 
              className="text-white/60 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-luxury-gold focus:ring-offset-2 focus:ring-offset-deep-black rounded px-1"
            >
              Terms & Conditions
            </Link>
          </nav>
        </div>
        
        <div className="mt-6 pt-6 border-t border-white/10 text-center text-xs text-white/40">
          <p>
            © {currentYear} SYNARCH. All rights reserved.
            <span className="sr-only">Architects of Inevitability.</span>
          </p>
        </div>
      </div>
    </footer>
  )
} 