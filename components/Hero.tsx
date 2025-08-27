import TypingHeading from '@/components/TypingHeading'
import AnimatedButton from '@/components/AnimatedButton'
import Reveal from '@/components/Reveal'

export default function Hero() {
  return (
    <section className="h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/30 pointer-events-none" />
      
      <div className="text-center max-w-7xl mx-auto relative z-10">
        {/* Main brand name */}
        <div className="mb-8">
          <TypingHeading
            text="SYNARCH"
            className="text-brand-giant font-serif font-black tracking-tighter leading-none"
          />
        </div>
        
        {/* Tagline */}
        <div className="mb-12">
          <TypingHeading
            text="Architects of Inevitability."
            className="font-serif text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-light tracking-wide leading-tight text-white/95"
          />
        </div>
        
        {/* Description */}
        <Reveal>
          <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl text-white/70 max-w-5xl mx-auto leading-relaxed mb-20 font-light tracking-wide">
            We do not predict the future. We build the foundational structures that make it possible.
          </p>
        </Reveal>
        
        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
          <AnimatedButton 
            href="/thesis" 
            variant="primary" 
            size="luxury"
            className="luxury-hover shadow-gold-glow"
          >
            Explore The Thesis
          </AnimatedButton>
          <AnimatedButton 
            href="/entities" 
            variant="secondary" 
            size="luxury"
            className="luxury-hover shadow-luxury"
          >
            Discover Entities
          </AnimatedButton>
        </div>
      </div>
    </section>
  )
}