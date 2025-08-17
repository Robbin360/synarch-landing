import AnimatedButton from '@/components/AnimatedButton'
import Reveal from '@/components/Reveal'

export default function EntitiesPage() {
  return (
    <main className="min-h-screen pt-24 px-6">
      <section className="max-w-5xl mx-auto text-center mb-20">
        <h1 className="font-serif text-4xl md:text-6xl font-medium mb-6">Operating Entities</h1>
        <p className="text-white/80 text-lg md:text-xl max-w-3xl mx-auto">
          NOEMA and FULCRUM form a closed loop of discovery and deployment, enabling inevitability.
        </p>
      </section>

      <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 mb-24">
        <Reveal>
          <div className="bg-white/5 rounded-xl p-8 border border-white/10">
            <h2 className="font-serif text-3xl font-medium mb-4">NOEMA</h2>
            <p className="text-white/80 mb-6">
              Research and development across artificial intelligence, quantum computing, and synthetic biology. From theory to engineered primitives.
            </p>
            <ul className="text-white/70 list-disc list-inside space-y-2 mb-6">
              <li>Foundation models and embodied AI</li>
              <li>Quantum algorithms and error mitigation</li>
              <li>Programmable biology and design automation</li>
            </ul>
            <AnimatedButton href="/contact">Collaborate With NOEMA</AnimatedButton>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="bg-white/5 rounded-xl p-8 border border-white/10">
            <h2 className="font-serif text-3xl font-medium mb-4">FULCRUM</h2>
            <p className="text-white/80 mb-6">
              Strategic investment and deployment platform. Capital, architecture, and operating cadence to transform breakthroughs into lasting systems.
            </p>
            <ul className="text-white/70 list-disc list-inside space-y-2 mb-6">
              <li>Company creation and scale-up</li>
              <li>Systems integration and governance</li>
              <li>Critical infrastructure partnerships</li>
            </ul>
            <AnimatedButton href="/contact" variant="secondary">Partner With FULCRUM</AnimatedButton>
          </div>
        </Reveal>
      </section>

      <section className="max-w-6xl mx-auto mb-24">
        <Reveal>
          <h2 className="font-serif text-3xl md:text-4xl font-medium mb-4 text-center">Synergy</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-white/80 max-w-3xl mx-auto text-center">
            NOEMA discovers and engineers the primitives. FULCRUM operationalizes and deploys. Together, they collapse the distance between discovery and inevitability.
          </p>
        </Reveal>
        <div className="mt-10 flex items-center justify-center gap-4">
          <AnimatedButton href="/contact">Understand Our Approach</AnimatedButton>
        </div>
      </section>
    </main>
  )
}

