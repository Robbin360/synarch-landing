import AnimatedButton from '@/components/AnimatedButton'
import Reveal from '@/components/Reveal'

export default function EntitiesPage() {
  return (
    <main className="min-h-screen pt-24 px-6 entities-page">
      <section className="max-w-5xl mx-auto text-center mb-20 hero fade-in-up">
        <h1 className="font-serif text-4xl md:text-6xl font-medium mb-6">Our Operating Entities</h1>
        <p className="text-white/80 text-lg md:text-xl max-w-3xl mx-auto">Two arms, one vision: reshaping the possible</p>
      </section>

      <section className="max-w-6xl mx-auto mb-24 noema-expanded fade-in-up">
        <div className="entity-header mb-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-medium">NOEMA: The Research Vanguard</h2>
          <p className="mission text-white/70">Fundamental breakthroughs at the intersection of possibility and reality</p>
        </div>
        <div className="entity-content grid md:grid-cols-2 gap-10">
          <div className="methodology bg-white/5 rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-medium mb-2">Our Methodology</h3>
            <p className="text-white/80">NOEMA operates at the intersection of theoretical physics and practical engineering, where abstract concepts become tangible technologies. We don't just study the future—we architect its foundations.</p>
          </div>
          <div className="focus-areas bg-white/5 rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-medium mb-4">Areas of Focus</h3>
            <div className="focus-grid grid md:grid-cols-2 gap-6">
              <div className="focus-item">
                <h4 className="font-medium">Artificial Intelligence Architectures</h4>
                <p className="text-white/80">Developing AI systems that transcend current limitations through novel architectural approaches and consciousness modeling.</p>
              </div>
              <div className="focus-item">
                <h4 className="font-medium">Quantum Computing Paradigms</h4>
                <p className="text-white/80">Creating quantum computing frameworks that unlock exponential computational capabilities for complex problem solving.</p>
              </div>
              <div className="focus-item">
                <h4 className="font-medium">Synthetic Biology Frameworks</h4>
                <p className="text-white/80">Engineering biological systems as programmable platforms for manufacturing, medicine, and environmental restoration.</p>
              </div>
              <div className="focus-item">
                <h4 className="font-medium">Foundational Technology Development</h4>
                <p className="text-white/80">Building the underlying technologies that will enable the next century of human advancement and capability expansion.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto mb-24 fulcrum-expanded fade-in-up">
        <div className="entity-header mb-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-medium">FULCRUM: The Strategic Catalyst</h2>
          <p className="mission text-white/70">Transforming breakthrough science into world-changing technologies</p>
        </div>
        <div className="entity-content grid md:grid-cols-2 gap-10">
          <div className="methodology bg-white/5 rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-medium mb-2">Our Approach</h3>
            <p className="text-white/80">FULCRUM doesn't just provide capital—we architect market inevitabilities. We identify ventures that align with fundamental technological trajectories and provide the strategic guidance to make their success inevitable.</p>
          </div>
          <div className="services bg-white/5 rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-medium mb-4">Strategic Services</h3>
            <div className="services-grid grid md:grid-cols-2 gap-6">
              <div className="service-item">
                <h4 className="font-medium">Strategic Capital Deployment</h4>
                <p className="text-white/80">Precision investment in ventures that control foundational technologies and market architectures.</p>
              </div>
              <div className="service-item">
                <h4 className="font-medium">Institutional Knowledge Transfer</h4>
                <p className="text-white/80">Sharing deep technical and strategic insights accumulated through our research and deployment activities.</p>
              </div>
              <div className="service-item">
                <h4 className="font-medium">Operational Excellence Support</h4>
                <p className="text-white/80">Providing operational frameworks and execution capabilities to transform scientific breakthroughs into market realities.</p>
              </div>
              <div className="service-item">
                <h4 className="font-medium">Market Architecture Guidance</h4>
                <p className="text-white/80">Strategic guidance on positioning and market development to create sustainable competitive advantages.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto mb-24 synergy fade-in-up">
        <h2 className="font-serif text-3xl md:text-4xl font-medium mb-6 text-center">The NOEMA-FULCRUM Synergy</h2>
        <div className="synergy-flow grid md:grid-cols-3 gap-6">
          <div className="flow-item bg-white/5 rounded-xl p-6 border border-white/10 text-center">
            <h3 className="font-medium mb-2">Research → Insight</h3>
            <p className="text-white/80">NOEMA's fundamental research generates insights into technological possibilities and constraints.</p>
          </div>
          <div className="flow-arrow text-center text-white/40 hidden md:block">→</div>
          <div className="flow-item bg-white/5 rounded-xl p-6 border border-white/10 text-center">
            <h3 className="font-medium mb-2">Insight → Strategy</h3>
            <p className="text-white/80">These insights inform FULCRUM's strategic investment and deployment decisions.</p>
          </div>
          <div className="flow-arrow text-center text-white/40 hidden md:block">→</div>
          <div className="flow-item bg-white/5 rounded-xl p-6 border border-white/10 text-center">
            <h3 className="font-medium mb-2">Strategy → Reality</h3>
            <p className="text-white/80">Strategic deployment creates market realities that validate and extend our research insights.</p>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto text-center cta-section fade-in-up">
        <div className="flex items-center justify-center gap-4 cta-buttons">
          <AnimatedButton href="/contact" variant="primary">Partner With FULCRUM</AnimatedButton>
          <AnimatedButton href="/contact" variant="secondary">Collaborate With NOEMA</AnimatedButton>
          <AnimatedButton href="/contact" variant="secondary">Understand Our Approach</AnimatedButton>
        </div>
      </section>
    </main>
  )
}

