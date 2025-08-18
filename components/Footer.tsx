export default function Footer() {
  return (
    <footer className="border-t border-white/10 pt-12 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="font-serif text-lg tracking-wide">SYNARCH</div>
          <nav className="flex items-center space-x-6 text-sm md:justify-end" role="navigation" aria-label="Legal">
            <a href="/privacy" className="text-white/60 hover:text-white transition-colors duration-200">Privacy Policy</a>
            <div className="text-white/40">|</div>
            <a href="/terms" className="text-white/60 hover:text-white transition-colors duration-200">Terms & Conditions</a>
          </nav>
        </div>
      </div>
    </footer>
  )
} 