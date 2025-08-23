'use client'

import { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
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
    },
    {
      id: 'bioinformatics',
      name: 'Bioinformatics',
      category: 'noema',
      ring: 'assess',
      description: 'Computational biology and genomics',
      impact: 65,
      angle: 180,
      radius: 0
    },

    // FULCRUM Investments
    {
      id: 'defi-protocols',
      name: 'DeFi Protocols',
      category: 'fulcrum',
      ring: 'adopt',
      description: 'Decentralized finance infrastructure',
      impact: 85,
      angle: 225,
      radius: 0
    },
    {
      id: 'algorithmic-trading',
      name: 'Algorithmic Trading',
      category: 'fulcrum',
      ring: 'adopt',
      description: 'AI-driven investment strategies',
      impact: 88,
      angle: 270,
      radius: 0
    },
    {
      id: 'risk-analytics',
      name: 'Risk Analytics',
      category: 'fulcrum',
      ring: 'trial',
      description: 'Advanced portfolio risk modeling',
      impact: 80,
      angle: 315,
      radius: 0
    },
    {
      id: 'esg-metrics',
      name: 'ESG Metrics',
      category: 'fulcrum',
      ring: 'assess',
      description: 'Environmental and social impact measurement',
      impact: 60,
      angle: 30,
      radius: 0
    },

    // Emerging Trends
    {
      id: 'quantum-ml',
      name: 'Quantum ML',
      category: 'emerging',
      ring: 'assess',
      description: 'Quantum machine learning algorithms',
      impact: 55,
      angle: 60,
      radius: 0
    },
    {
      id: 'neuromorphic-chips',
      name: 'Neuromorphic Computing',
      category: 'emerging',
      ring: 'assess',
      description: 'Brain-inspired computing architectures',
      impact: 50,
      angle: 120,
      radius: 0
    },
    {
      id: 'synthetic-biology',
      name: 'Synthetic Biology',
      category: 'emerging',
      ring: 'hold',
      description: 'Engineered biological systems',
      impact: 45,
      angle: 200,
      radius: 0
    },
    {
      id: 'space-tech',
      name: 'Space Technology',
      category: 'emerging',
      ring: 'hold',
      description: 'Satellite and space infrastructure',
      impact: 40,
      angle: 250,
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

  useEffect(() => {
    if (!svgRef.current) return

    const svg = d3.select(svgRef.current)
    const width = 600
    const height = 600
    const centerX = width / 2
    const centerY = height / 2

    // Clear previous content
    svg.selectAll('*').remove()

    // Set up SVG
    svg
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`)

    // Create main group
    const g = svg.append('g')
      .attr('transform', `translate(${centerX}, ${centerY})`)

    // Draw rings
    rings.forEach((ring, index) => {
      g.append('circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', ring.radius)
        .attr('fill', 'none')
        .attr('stroke', ring.color)
        .attr('stroke-width', 2)
        .attr('stroke-opacity', 0.3)

      // Ring labels
      g.append('text')
        .attr('x', ring.radius - 20)
        .attr('y', -5)
        .attr('text-anchor', 'end')
        .attr('font-size', '12px')
        .attr('fill', ring.color)
        .attr('font-weight', 'bold')
        .text(ring.label)
    })

    // Draw quadrant lines
    g.append('line')
      .attr('x1', -280)
      .attr('y1', 0)
      .attr('x2', 280)
      .attr('y2', 0)
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 1)
      .attr('stroke-opacity', 0.2)

    g.append('line')
      .attr('x1', 0)
      .attr('y1', -280)
      .attr('x2', 0)
      .attr('y2', 280)
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 1)
      .attr('stroke-opacity', 0.2)

    // Position technologies
    const positionedTechnologies = technologies.map(tech => {
      const ring = rings.find(r => r.name === tech.ring)!
      const angleRad = (tech.angle * Math.PI) / 180
      const radiusWithVariation = ring.radius - 30 + (Math.random() * 60)
      
      return {
        ...tech,
        x: Math.cos(angleRad) * radiusWithVariation,
        y: Math.sin(angleRad) * radiusWithVariation,
        radius: radiusWithVariation
      }
    })

    // Draw technology dots
    const dots = g.selectAll('.tech-dot')
      .data(positionedTechnologies)
      .enter()
      .append('g')
      .attr('class', 'tech-dot')
      .attr('transform', d => `translate(${d.x}, ${d.y})`)
      .style('cursor', 'pointer')

    // Technology circles
    dots.append('circle')
      .attr('r', 0)
      .attr('fill', d => categories[d.category].color)
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 2)
      .transition()
      .delay((d, i) => i * 100)
      .duration(800)
      .attr('r', d => 4 + (d.impact / 100) * 8)

    // Technology labels
    dots.append('text')
      .attr('x', 0)
      .attr('y', d => -(4 + (d.impact / 100) * 8) - 8)
      .attr('text-anchor', 'middle')
      .attr('font-size', '10px')
      .attr('fill', '#ffffff')
      .attr('font-weight', '500')
      .style('opacity', 0)
      .text(d => d.name)
      .transition()
      .delay((d, i) => i * 100 + 400)
      .duration(600)
      .style('opacity', 0.8)

    // Interaction handlers
    dots
      .on('mouseenter', function(event, d) {\n        setHoveredTech(d)\n        d3.select(this).select('circle')\n          .transition()\n          .duration(200)\n          .attr('r', 4 + (d.impact / 100) * 12)\n          .attr('stroke-width', 3)\n      })\n      .on('mouseleave', function(event, d) {\n        setHoveredTech(null)\n        d3.select(this).select('circle')\n          .transition()\n          .duration(200)\n          .attr('r', 4 + (d.impact / 100) * 8)\n          .attr('stroke-width', 2)\n      })\n      .on('click', function(event, d) {\n        setSelectedTech(d === selectedTech ? null : d)\n      })

    // Legend
    const legend = svg.append('g')\n      .attr('transform', 'translate(20, 20)')\n\n    Object.entries(categories).forEach(([key, category], index) => {\n      const legendItem = legend.append('g')\n        .attr('transform', `translate(0, ${index * 25})`)\n\n      legendItem.append('circle')\n        .attr('r', 6)\n        .attr('fill', category.color)\n\n      legendItem.append('text')\n        .attr('x', 15)\n        .attr('y', 4)\n        .attr('font-size', '12px')\n        .attr('fill', '#ffffff')\n        .attr('font-weight', '500')\n        .text(category.label)\n    })\n\n  }, [])\n\n  return (\n    <div className={`relative ${className}`}>\n      <div className=\"text-center mb-8\">\n        <h2 className=\"text-3xl font-serif text-white mb-4\">\n          Technology Radar\n        </h2>\n        <p className=\"text-white/70 max-w-2xl mx-auto\">\n          Interactive visualization of SYNARCH's technology landscape, \n          investment priorities, and emerging opportunities.\n        </p>\n      </div>\n\n      <div className=\"flex justify-center mb-8\">\n        <svg\n          ref={svgRef}\n          className=\"border border-white/10 rounded-xl bg-charcoal/50 backdrop-blur-sm\"\n        />\n      </div>\n\n      {/* Technology Details Panel */}\n      {(hoveredTech || selectedTech) && (\n        <motion.div\n          initial={{ opacity: 0, y: 20 }}\n          animate={{ opacity: 1, y: 0 }}\n          exit={{ opacity: 0, y: 20 }}\n          className=\"bg-charcoal/90 backdrop-blur-xl border border-white/10 rounded-xl p-6 max-w-md mx-auto\"\n        >\n          {(() => {\n            const tech = selectedTech || hoveredTech\n            if (!tech) return null\n            \n            const category = categories[tech.category]\n            const ring = rings.find(r => r.name === tech.ring)!\n            \n            return (\n              <>\n                <div className=\"flex items-center gap-3 mb-4\">\n                  <div \n                    className=\"w-4 h-4 rounded-full\"\n                    style={{ backgroundColor: category.color }}\n                  />\n                  <h3 className=\"text-xl font-medium text-white\">\n                    {tech.name}\n                  </h3>\n                </div>\n                \n                <div className=\"space-y-3\">\n                  <p className=\"text-white/80\">\n                    {tech.description}\n                  </p>\n                  \n                  <div className=\"flex justify-between items-center text-sm\">\n                    <span className=\"text-white/60\">Category:</span>\n                    <span \n                      className=\"font-medium\"\n                      style={{ color: category.color }}\n                    >\n                      {category.label}\n                    </span>\n                  </div>\n                  \n                  <div className=\"flex justify-between items-center text-sm\">\n                    <span className=\"text-white/60\">Status:</span>\n                    <span \n                      className=\"font-medium\"\n                      style={{ color: ring.color }}\n                    >\n                      {ring.label}\n                    </span>\n                  </div>\n                  \n                  <div className=\"flex justify-between items-center text-sm\">\n                    <span className=\"text-white/60\">Impact Score:</span>\n                    <div className=\"flex items-center gap-2\">\n                      <div className=\"w-16 h-2 bg-white/20 rounded-full overflow-hidden\">\n                        <div \n                          className=\"h-full bg-gradient-to-r from-electric-blue to-quantum-purple rounded-full transition-all duration-300\"\n                          style={{ width: `${tech.impact}%` }}\n                        />\n                      </div>\n                      <span className=\"font-medium text-white\">\n                        {tech.impact}/100\n                      </span>\n                    </div>\n                  </div>\n                </div>\n                \n                {selectedTech && (\n                  <button\n                    onClick={() => setSelectedTech(null)}\n                    className=\"mt-4 text-sm text-white/60 hover:text-white transition-colors\"\n                  >\n                    Click to close\n                  </button>\n                )}\n              </>\n            )\n          })()} \n        </motion.div>\n      )}\n\n      {/* Instructions */}\n      <div className=\"text-center mt-8 text-sm text-white/50\">\n        Hover over dots for details • Click to pin information\n      </div>\n    </div>\n  )\n}"
<parameter name="add_last_line_newline">true