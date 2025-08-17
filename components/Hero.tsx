import TypingHeading from '@/components/TypingHeading'
import AnimatedButton from '@/components/AnimatedButton'
import Reveal from '@/components/Reveal'

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="text-center max-w-4xl mx-auto">
        <TypingHeading
          text="Architects of Inevitability."
          className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-tight mb-8"
        />
        <Reveal>
          <p className="text-lg md:text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed mb-8">
            We do not predict the future. We build the foundational structures that make it possible.
          </p>
        </Reveal>
        <div className="flex items-center justify-center gap-4">
          <AnimatedButton href="/thesis" variant="primary">Explore The Thesis</AnimatedButton>
          <AnimatedButton href="/entities" variant="secondary">Discover Entities</AnimatedButton>
        </div>
      </div>
    </section>
  )
}