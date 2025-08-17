export default function Footer() {
  return (
    <footer className="border-t border-white/10 pt-12 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="text-sm text-white/60">
            © 2024 SYNARCH. All rights reserved.
          </div>
          <nav className="flex items-center space-x-6 text-sm" role="navigation" aria-label="Footer">
            <a href="/thesis" className="text-white/60 hover:text-white transition-colors duration-200">Thesis</a>
            <div className="text-white/40">|</div>
            <a href="/entities" className="text-white/60 hover:text-white transition-colors duration-200">Entities</a>
            <div className="text-white/40">|</div>
            <a href="/contact" className="text-white/60 hover:text-white transition-colors duration-200">Contact</a>
          </nav>
        </div>
      </div>
    </footer>
  )
} 