export default function Entities() {
  return (
    <section id="entities" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium mb-16 text-center">
          Our Operating Entities
        </h2>
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 max-w-6xl mx-auto">
          {/* NOEMA */}
          <div className="text-center md:text-left">
            <h3 className="font-serif text-3xl md:text-4xl font-medium mb-8">
              NOEMA
            </h3>
            <p className="text-lg leading-relaxed text-white/90">
              Our research and development arm focused on fundamental breakthroughs in artificial intelligence, 
              quantum computing, and synthetic biology. NOEMA operates at the intersection of theoretical physics 
              and practical engineering, creating the foundational technologies that will define the next century.
            </p>
          </div>

          {/* FULCRUM */}
          <div className="text-center md:text-left">
            <h3 className="font-serif text-3xl md:text-4xl font-medium mb-8">
              FULCRUM
            </h3>
            <p className="text-lg leading-relaxed text-white/90">
              Our strategic investment and deployment platform that identifies and accelerates the most promising 
              deep-tech ventures. FULCRUM provides not just capital, but the institutional knowledge, 
              strategic guidance, and operational support needed to transform breakthrough science into 
              world-changing technologies.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
} 