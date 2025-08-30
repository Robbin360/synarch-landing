'use client'

/**
 * Accessibility Skip Links Component
 * 
 * Este componente se renderiza únicamente en el cliente para evitar
 * hydration mismatches causados por diferencias de localización
 * entre servidor y cliente.
 * 
 * Los skip links son elementos críticos para la accesibilidad que
 * permiten a usuarios de lectores de pantalla navegar rápidamente
 * al contenido principal.
 */

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

export default function AccessibilitySkipLinks() {
  const t = useTranslations('AccessibilitySkipLinks')
  const [isMounted, setIsMounted] = useState(false)

  // Asegurar que solo se renderiza en el cliente
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // No renderizar nada durante SSR
  if (!isMounted) {
    return null
  }

  return (
    <>
      {/* Skip Links for Accessibility */}
      <a 
        href="#main-content" 
        className="skip-links sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-luxury-gold focus:text-deep-black focus:rounded-lg focus:font-medium focus:shadow-lg"
      >
        {t('skipToMain')}
      </a>
      <a 
        href="#navigation" 
        className="skip-links sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-40 focus:z-50 focus:px-4 focus:py-2 focus:bg-luxury-gold focus:text-deep-black focus:rounded-lg focus:font-medium focus:shadow-lg"
      >
        {t('skipToNavigation')}
      </a>
    </>
  )
}