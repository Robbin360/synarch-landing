'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * Background3D renders a subtle animated particle field with gentle rotation
 * and color tones in blue/violet. It is fixed behind all content and
 * responds slightly to mouse movement.
 */
export default function Background3D() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 60

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    // Particles
    const particleCount = Math.min(900, Math.floor((window.innerWidth * window.innerHeight) / 2500))
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const colorA = new THREE.Color('#5b7cfa') // blue
    const colorB = new THREE.Color('#8e5cff') // violet

    for (let i = 0; i < particleCount; i++) {
      // Distribute in a sphere shell
      const r = 40 + Math.random() * 20
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const x = r * Math.sin(phi) * Math.cos(theta)
      const y = r * Math.sin(phi) * Math.sin(theta)
      const z = r * Math.cos(phi)
      positions[i * 3 + 0] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z

      const t = Math.random()
      const c = colorA.clone().lerp(colorB, t)
      colors[i * 3 + 0] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const material = new THREE.PointsMaterial({
      size: 0.6,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
    })

    const points = new THREE.Points(geometry, material)
    scene.add(points)

    // Subtle group rotation container for mouse interactivity
    const group = new THREE.Group()
    group.add(points)
    scene.add(group)

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)

    const onMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      mouseRef.current.x = x
      mouseRef.current.y = y
    }
    window.addEventListener('mousemove', onMouseMove)

    let frameId: number
    const animate = () => {
      // Gentle rotation
      group.rotation.y += 0.0008
      group.rotation.x += 0.0004

      // Mouse parallax influence
      const targetRotX = mouseRef.current.y * 0.08
      const targetRotY = mouseRef.current.x * 0.12
      group.rotation.x += (targetRotX - group.rotation.x) * 0.02
      group.rotation.y += (targetRotY - group.rotation.y) * 0.02

      renderer.render(scene, camera)
      frameId = requestAnimationFrame(animate)
    }
    frameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouseMove)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      container.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}

