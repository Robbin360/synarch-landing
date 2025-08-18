import AnimatedButton from '@/components/AnimatedButton'
import Reveal from '@/components/Reveal'
import QuickNavButtons from '@/components/QuickNavButtons'

export default function ThesisPage() {
  return (
    <main className="min-h-screen pt-24 px-6 thesis-page">
      <section className="max-w-5xl mx-auto text-center mb-20 hero fade-in-up">
        <h1 className="font-serif text-4xl md:text-6xl font-medium mb-6">The Synarch Thesis: Engineering Inevitability</h1>
        <p className="text-white/80 text-lg md:text-xl max-w-3xl mx-auto">Beyond prediction lies creation. Beyond creation lies inevitability.</p>
      </section>

      <section className="max-w-6xl mx-auto mb-24 pillars fade-in-up">
        <h2 className="font-serif text-3xl md:text-4xl font-medium mb-8 text-center">The Fundamental Pillars</h2>
        <div className="grid md:grid-cols-3 gap-10 pillar-grid">
          <div className="bg-white/5 rounded-xl p-6 border border-white/10 pillar">
            <h3 className="font-serif text-2xl mb-3">Constraint Identification</h3>
            <p className="text-white/80">We identify the fundamental constraints that shape reality and limit possibility. These constraints exist at multiple levels: physical laws, technological limitations, economic structures, and cognitive biases.</p>
          </div>
          <div className="bg-white/5 rounded-xl p-6 border border-white/10 pillar">
            <h3 className="font-serif text-2xl mb-3">Systematic Removal</h3>
            <p className="text-white/80">Through methodical analysis and strategic intervention, we systematically remove these constraints. This isn't about breaking rules—it's about rewriting the underlying architecture of possibility.</p>
          </div>
          <div className="bg-white/5 rounded-xl p-6 border border-white/10 pillar">
            <h3 className="font-serif text-2xl mb-3">Outcome Architecture</h3>
            <p className="text-white/80">We create the conditions where certain outcomes become inevitable. By controlling the foundational structures, we architect the future rather than merely predict it.</p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto mb-24 difference fade-in-up">
        <h2 className="font-serif text-3xl md:text-4xl font-medium mb-8 text-center">The Synarch Difference</h2>
        <div className="grid md:grid-cols-2 gap-10 comparison">
          <div className="bg-white/0 rounded-xl p-6 border border-white/10 traditional">
            <h3 className="text-xl font-medium mb-3">Traditional Approach</h3>
            <ul className="text-white/70 list-disc list-inside space-y-2">
              <li>Extrapolates from existing paradigms</li>
              <li>Predicts based on current trends</li>
              <li>Reacts to market forces</li>
              <li>Limited by conventional thinking</li>
            </ul>
          </div>
          <div className="bg-white/0 rounded-xl p-6 border border-white/10 synarch">
            <h3 className="text-xl font-medium mb-3">Synarch Methodology</h3>
            <ul className="text-white/70 list-disc list-inside space-y-2">
              <li>Identifies fundamental constraints</li>
              <li>Creates conditions for inevitability</li>
              <li>Shapes market architecture</li>
              <li>Transcends paradigm limitations</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto text-center cta-section fade-in-up">
        <div className="flex items-center justify-center gap-4 cta-buttons">
          <AnimatedButton href="#pillars" variant="primary">Explore Our Manifesto</AnimatedButton>
          <AnimatedButton href="/entities" variant="secondary">Discover Our Entities</AnimatedButton>
          <AnimatedButton href="/contact" variant="secondary">Engage With Us</AnimatedButton>
        </div>
      </section>
      <div className="py-16 flex items-center justify-center">
        <QuickNavButtons />
      </div>
    </main>
  )
}

