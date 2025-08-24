'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface TechnologyItem {
  id: string
  name: string
  category: 'noema' | 'fulcrum' | 'emerging'
  ring: 'adopt' | 'trial' | 'assess' | 'hold'
  description: string
  impact: number // 1-100
  angle: number
  radius: number
}

interface TechnologyRadarProps {
  className?: string
}

export default function TechnologyRadar({ className = '' }: TechnologyRadarProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [selectedTech, setSelectedTech] = useState<TechnologyItem | null>(null)
  const [hoveredTech, setHoveredTech] = useState<TechnologyItem | null>(null)

  // Technology data
  const technologies: TechnologyItem[] = [
    // NOEMA Technologies
    {
      id: 'quantum-computing',
      name: 'Quantum Computing',
      category: 'noema',
      ring: 'adopt',
      description: 'Quantum algorithms for optimization and cryptography',
      impact: 95,
      angle: 0,
      radius: 0
    },
    {
      id: 'neural-networks',
      name: 'Neural Networks',
      category: 'noema',
      ring: 'adopt',
      description: 'Deep learning and AI model architectures',
      impact: 90,
      angle: 45,
      radius: 0
    },
    {
      id: 'blockchain-infra',
      name: 'Blockchain Infrastructure',
      category: 'noema',
      ring: 'trial',
      description: 'Decentralized systems and smart contracts',
      impact: 75,
      angle: 90,
      radius: 0
    },
    {
      id: 'edge-computing',
      name: 'Edge Computing',
      category: 'noema',
      ring: 'trial',
      description: 'Distributed computing at network edge',
      impact: 70,
      angle: 135,
      radius: 0
    }
  ]

  // Ring configuration
  const rings = [
    { name: 'adopt', radius: 80, color: '#10B981', label: 'ADOPT' },
    { name: 'trial', radius: 140, color: '#F59E0B', label: 'TRIAL' },
    { name: 'assess', radius: 200, color: '#8B5CF6', label: 'ASSESS' },
    { name: 'hold', radius: 260, color: '#EF4444', label: 'HOLD' }
  ]

  // Category configuration
  const categories = {
    noema: { color: '#00D4FF', label: 'NOEMA' },
    fulcrum: { color: '#D4AF37', label: 'FULCRUM' },
    emerging: { color: '#8B5CF6', label: 'EMERGING' }
  }

  return (
    <div className={`relative ${className}`}>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-serif text-white mb-4">
          Technology Radar
        </h2>
        <p className="text-white/70 max-w-2xl mx-auto">
          Interactive visualization of SYNARCH's technology landscape, 
          investment priorities, and emerging opportunities.
        </p>
      </div>

      <div className="flex justify-center mb-8">
        <svg
          ref={svgRef}
          width={600}
          height={600}
          className="border border-white/10 rounded-xl bg-charcoal/50 backdrop-blur-sm"
        >
          <text x="300" y="300" textAnchor="middle" fill="white" fontSize="16">
            Technology Radar (D3 Implementation Coming Soon)
          </text>
        </svg>
      </div>

      {/* Technology Details Panel */}
      {(hoveredTech || selectedTech) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="bg-charcoal/90 backdrop-blur-xl border border-white/10 rounded-xl p-6 max-w-md mx-auto"
        >
          {(() => {
            const tech = selectedTech || hoveredTech
            if (!tech) return null
            
            const category = categories[tech.category]
            const ring = rings.find(r => r.name === tech.ring)!
            
            return (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <h3 className="text-xl font-medium text-white">
                    {tech.name}
                  </h3>
                </div>
                
                <div className="space-y-3">
                  <p className="text-white/80">
                    {tech.description}
                  </p>
                  
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-white/60">Category:</span>
                    <span 
                      className="font-medium"
                      style={{ color: category.color }}
                    >
                      {category.label}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-white/60">Status:</span>
                    <span 
                      className="font-medium"
                      style={{ color: ring.color }}
                    >
                      {ring.label}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-white/60">Impact Score:</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-white/20 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-electric-blue to-quantum-purple rounded-full transition-all duration-300"
                          style={{ width: `${tech.impact}%` }}
                        />
                      </div>
                      <span className="font-medium text-white">
                        {tech.impact}/100
                      </span>
                    </div>
                  </div>
                </div>
                
                {selectedTech && (
                  <button
                    onClick={() => setSelectedTech(null)}
                    className="mt-4 text-sm text-white/60 hover:text-white transition-colors"
                  >
                    Click to close
                  </button>
                )}
              </>
            )
          })()} 
        </motion.div>
      )}

      {/* Instructions */}
      <div className="text-center mt-8 text-sm text-white/50">
        Technology visualization will be enhanced with D3.js integration
      </div>
    </div>
  )
}