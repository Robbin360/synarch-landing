'use client'

/**
 * ClientBoundary Component
 * 
 * Componente de límite seguro para prevenir errores de hidratación en Next.js.
 * Este patrón asegura que los componentes client-only se rendericen correctamente
 * evitando mismatches entre servidor y cliente.
 * 
 * Casos de uso:
 * - Componentes que acceden a window/document
 * - Componentes con importación dinámica ssr: false
 * - Elementos que requieren estados específicos del cliente
 * 
 * @pattern Client Boundary Pattern
 * @framework Next.js 15+ with App Router
 * @compatibility React 18+
 */

import { useEffect, useState, type ReactNode } from 'react'

interface ClientBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  suppressHydrationWarning?: boolean
  className?: string
}

export default function ClientBoundary({ 
  children, 
  fallback = null,
  suppressHydrationWarning = true,
  className = ''
}: ClientBoundaryProps) {
  const [hasMounted, setHasMounted] = useState(false)
  
  useEffect(() => {
    // Asegurar que el DOM esté completamente listo
    const timer = setTimeout(() => {
      setHasMounted(true)
    }, 0)
    
    return () => clearTimeout(timer)
  }, [])
  
  // Durante SSR y antes del primer mount, mostrar fallback
  if (!hasMounted) {
    return fallback ? (
      <div className={className} suppressHydrationWarning={suppressHydrationWarning}>
        {fallback}
      </div>
    ) : null
  }
  
  // Una vez montado en el cliente, renderizar children
  return (
    <div className={className} suppressHydrationWarning={suppressHydrationWarning}>
      {children}
    </div>
  )
}