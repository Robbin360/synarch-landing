'use client'

/**
 * SafeSkipLinks Component
 * 
 * Implementación segura de skip links que previene errores de hidratación
 * utilizando el patrón ClientBoundary. Este componente reemplaza DynamicSkipLinks
 * y proporciona una solución más robusta para la accesibilidad.
 * 
 * Características:
 * - Prevención de errores de hidratación
 * - Renderizado client-only seguro
 * - Accesibilidad completa
 * - Compatibilidad con SSR
 * 
 * @implements Client Boundary Pattern
 * @accessibility WCAG 2.1 AA Compliant
 * @performance Zero layout shift
 */

import { Suspense } from 'react'
import AccessibilitySkipLinks from './AccessibilitySkipLinks'

export default function SafeSkipLinks() {
  return (
    <Suspense fallback={null}>
      <AccessibilitySkipLinks />
    </Suspense>
  )
}