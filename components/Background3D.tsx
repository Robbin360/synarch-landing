'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Suspense } from 'react'

// Types for our enhanced background system
interface RenderEngine {
  name: 'webgpu' | 'webgl' | 'css'
  capabilities: {
    particleCount: number
    physics: boolean
    advancedLighting: boolean
    postProcessing: boolean
  }
}

interface ParticlePhysics {
  position: THREE.Vector3
  velocity: THREE.Vector3
  acceleration: THREE.Vector3
  mass: number
  life: number
  maxLife: number
}

// Device capability detection
function detectRenderCapabilities(): RenderEngine {
  // Check for WebGPU support
  if (typeof window !== 'undefined' && 'navigator' in window && 'gpu' in navigator) {
    return {
      name: 'webgpu',
      capabilities: {
        particleCount: 2000,
        physics: true,
        advancedLighting: true,
        postProcessing: true
      }
    }
  }

  // Check for WebGL support
  if (typeof window !== 'undefined') {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
    if (gl) {
      const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE)
      const isHighPerformance = maxTextureSize >= 4096
      
      return {
        name: 'webgl',
        capabilities: {
          particleCount: isHighPerformance ? 1500 : 800,
          physics: isHighPerformance,
          advancedLighting: isHighPerformance,
          postProcessing: false
        }
      }
    }
  }

  // Fallback to CSS animations
  return {
    name: 'css',
    capabilities: {
      particleCount: 50,
      physics: false,
      advancedLighting: false,
      postProcessing: false
    }
  }
}

// Enhanced particle system with physics
function ParticleSystem({ engine }: { engine: RenderEngine }) {
  const meshRef = useRef<THREE.Points>(null)
  const { size, camera } = useThree()
  const [particles, setParticles] = useState<ParticlePhysics[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const attractorRef = useRef(new THREE.Vector3())
  const timeRef = useRef(0)

  // Initialize particle physics system
  useEffect(() => {
    const particleCount = engine.capabilities.particleCount
    const newParticles: ParticlePhysics[] = []

    for (let i = 0; i < particleCount; i++) {
      // Create particles in quantum field formation
      const radius = 40 + Math.random() * 60
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      
      const position = new THREE.Vector3(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      )

      newParticles.push({
        position: position.clone(),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02
        ),
        acceleration: new THREE.Vector3(),
        mass: 0.5 + Math.random() * 0.5,
        life: Math.random(),
        maxLife: 1 + Math.random() * 2
      })
    }

    setParticles(newParticles)
  }, [engine])

  // Mouse interaction
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1
      
      // Update attractor position
      attractorRef.current.set(
        mouseRef.current.x * 50,
        mouseRef.current.y * 50,
        0
      )
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Physics simulation
  useFrame((state, delta) => {
    if (!meshRef.current || !engine.capabilities.physics) return

    timeRef.current += delta
    const geometry = meshRef.current.geometry
    const positions = geometry.attributes.position.array as Float32Array
    const colors = geometry.attributes.color.array as Float32Array
    const scales = geometry.attributes.scale.array as Float32Array

    particles.forEach((particle, i) => {
      // Physics calculations
      if (engine.capabilities.physics) {
        // Gravitational attraction to mouse
        const distance = particle.position.distanceTo(attractorRef.current)
        if (distance < 30) {
          const direction = attractorRef.current.clone().sub(particle.position).normalize()
          const force = direction.multiplyScalar(0.0001 / particle.mass)
          particle.acceleration.add(force)
        }

        // Quantum field fluctuations
        const quantumNoise = new THREE.Vector3(
          (Math.random() - 0.5) * 0.0001,
          (Math.random() - 0.5) * 0.0001,
          (Math.random() - 0.5) * 0.0001
        )
        particle.acceleration.add(quantumNoise)

        // Apply physics
        particle.velocity.add(particle.acceleration.clone().multiplyScalar(delta))
        particle.position.add(particle.velocity.clone().multiplyScalar(delta))
        particle.acceleration.multiplyScalar(0) // Reset acceleration

        // Velocity damping
        particle.velocity.multiplyScalar(0.995)
      }

      // Update particle life
      particle.life += delta * 0.1
      if (particle.life > particle.maxLife) {
        particle.life = 0
        // Respawn particle
        const radius = 40 + Math.random() * 60
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(2 * Math.random() - 1)
        
        particle.position.set(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi)
        )
      }

      // Update geometry
      const i3 = i * 3
      positions[i3] = particle.position.x
      positions[i3 + 1] = particle.position.y
      positions[i3 + 2] = particle.position.z

      // Dynamic coloring based on quantum states
      const lifeFactor = particle.life / particle.maxLife
      const quantumState = Math.sin(timeRef.current * 2 + i * 0.1) * 0.5 + 0.5
      
      if (quantumState < 0.33) {
        // Quantum purple state
        colors[i3] = 0.55 + lifeFactor * 0.4     // R
        colors[i3 + 1] = 0.36 + lifeFactor * 0.3 // G
        colors[i3 + 2] = 0.96                    // B
      } else if (quantumState < 0.66) {
        // Neural green state
        colors[i3] = 0.06                        // R
        colors[i3 + 1] = 0.73 + lifeFactor * 0.2 // G
        colors[i3 + 2] = 0.51                    // B
      } else {
        // Electric blue state
        colors[i3] = 0.0                         // R
        colors[i3 + 1] = 0.83 + lifeFactor * 0.1 // G
        colors[i3 + 2] = 1.0                     // B
      }

      // Dynamic scaling
      const baseScale = 0.5 + Math.sin(timeRef.current + i * 0.1) * 0.3
      const proximityScale = distance < 20 ? 1 + (20 - distance) / 20 : 1
      scales[i] = baseScale * proximityScale * (0.5 + lifeFactor * 0.5)
    })

    // Mark attributes as needing update
    geometry.attributes.position.needsUpdate = true
    geometry.attributes.color.needsUpdate = true
    geometry.attributes.scale.needsUpdate = true
  })

  // Create geometry
  const particleCount = particles.length
  const positions = new Float32Array(particleCount * 3)
  const colors = new Float32Array(particleCount * 3)
  const scales = new Float32Array(particleCount)

  particles.forEach((particle, i) => {
    positions[i * 3] = particle.position.x
    positions[i * 3 + 1] = particle.position.y
    positions[i * 3 + 2] = particle.position.z
    
    colors[i * 3] = 0.5
    colors[i * 3 + 1] = 0.7
    colors[i * 3 + 2] = 1.0
    
    scales[i] = 1.0
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-scale"
          count={particleCount}
          array={scales}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={engine.capabilities.advancedLighting ? 2.0 : 1.5}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  )
}

// CSS fallback component
function CSSFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-electric-blue rounded-full animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
            opacity: 0.3 + Math.random() * 0.4
          }}
        />
      ))}
      {[...Array(30)].map((_, i) => (
        <div
          key={`quantum-${i}`}
          className="absolute w-2 h-2 bg-quantum-purple rounded-full animate-quantum-spin"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 4}s`,
            animationDuration: `${4 + Math.random() * 2}s`,
            opacity: 0.2 + Math.random() * 0.3
          }}
        />
      ))}
      {[...Array(20)].map((_, i) => (
        <div
          key={`neural-${i}`}
          className="absolute w-1.5 h-1.5 bg-neural-green rounded-full animate-neural-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 1}s`,
            opacity: 0.4 + Math.random() * 0.3
          }}
        />
      ))}
    </div>
  )
}

// Performance monitoring
function usePerformanceMonitor() {
  const [fps, setFps] = useState(60)
  const frameRef = useRef(0)
  const lastTimeRef = useRef(performance.now())

  useEffect(() => {
    const updateFPS = () => {
      frameRef.current++
      const now = performance.now()
      
      if (now - lastTimeRef.current >= 1000) {
        setFps(frameRef.current)
        frameRef.current = 0
        lastTimeRef.current = now
      }
      
      requestAnimationFrame(updateFPS)
    }
    
    requestAnimationFrame(updateFPS)
  }, [])

  return fps
}

/**
 * Enhanced Background3D with WebGPU support, progressive fallback, and physics simulation
 */
export default function Background3D() {
  const [engine, setEngine] = useState<RenderEngine | null>(null)
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  const fps = usePerformanceMonitor()

  // Initialize render engine on mount
  useEffect(() => {
    const detectedEngine = detectRenderCapabilities()
    setEngine(detectedEngine)

    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setIsReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches)
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Performance-based fallback
  useEffect(() => {
    if (fps < 30 && engine?.name === 'webgpu') {
      setEngine(detectRenderCapabilities()) // Fallback to WebGL
    }
  }, [fps, engine])

  if (!engine || isReducedMotion) {
    return (
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(10, 10, 10, 0.9) 0%, rgba(10, 10, 10, 1) 100%)'
        }}
      >
        {!isReducedMotion && <CSSFallback />}
      </div>
    )
  }

  if (engine.name === 'css') {
    return (
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(10, 10, 10, 0.9) 0%, rgba(10, 10, 10, 1) 100%)'
        }}
      >
        <CSSFallback />
      </div>
    )
  }

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      style={{
        background: 'radial-gradient(ellipse at center, rgba(10, 10, 10, 0.9) 0%, rgba(10, 10, 10, 1) 100%)'
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 70], fov: 65 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
        dpr={Math.min(window.devicePixelRatio, 2)}
      >
        <Suspense fallback={null}>
          <ParticleSystem engine={engine} />
        </Suspense>
      </Canvas>
      
      {/* Performance indicator for development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-4 right-4 text-xs text-white/50 z-50">
          {engine.name.toUpperCase()} | {fps} FPS
        </div>
      )}
    </div>
  )
}

