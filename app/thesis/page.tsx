import AnimatedButton from '@/components/AnimatedButton'
import Reveal from '@/components/Reveal'

export default function ThesisPage() {
  return (
    <main className="min-h-screen pt-24 px-6">
      <section className="max-w-5xl mx-auto text-center mb-20">
        <h1 className="font-serif text-4xl md:text-6xl font-medium mb-6">The Synarch Thesis: Engineering Inevitability</h1>
        <p className="text-white/80 text-lg md:text-xl max-w-3xl mx-auto">
          Our thesis is not about prediction. It is about constructing conditions where outcomes become inescapable.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <AnimatedButton href="#pillars">Explore Our Manifesto</AnimatedButton>
          <AnimatedButton href="/entities" variant="secondary">Discover Our Entities</AnimatedButton>
          <AnimatedButton href="/contact" variant="secondary">Engage With Us</AnimatedButton>
        </div>
      </section>

      <section id="pillars" className="max-w-6xl mx-auto mb-24">
        <Reveal>
          <h2 className="font-serif text-3xl md:text-4xl font-medium mb-8 text-center">Fundamental Pillars</h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-10">
          <Reveal>
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h3 className="font-serif text-2xl mb-3">Constraint Removal</h3>
              <p className="text-white/80">We identify the structural constraints that limit progress and remove them methodically.</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h3 className="font-serif text-2xl mb-3">Systems Engineering</h3>
              <p className="text-white/80">We design resilient architectures that unlock inevitabilities across domains.</p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h3 className="font-serif text-2xl mb-3">Purposeful Deployment</h3>
              <p className="text-white/80">We deploy capital and expertise to make paradigm shifts operational and durable.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="max-w-6xl mx-auto mb-24">
        <Reveal>
          <h2 className="font-serif text-3xl md:text-4xl font-medium mb-8 text-center">The Synarch Difference</h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-10">
          <Reveal>
            <div className="p-6">
              <h3 className="text-xl font-medium mb-3">Not Forecasting — Engineering</h3>
              <p className="text-white/80">We favor first-principles construction over predictive speculation.</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="p-6">
              <h3 className="text-xl font-medium mb-3">Institutional Knowledge</h3>
              <p className="text-white/80">Integrated operating and investment expertise aligned to execution.</p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="p-6">
              <h3 className="text-xl font-medium mb-3">Silent Power</h3>
              <p className="text-white/80">We optimize for results, not noise, ensuring focused progress.</p>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}

