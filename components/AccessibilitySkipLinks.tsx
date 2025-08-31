'use client'

import { useTranslations } from 'next-intl'

export default function AccessibilitySkipLinks() {
  const t = useTranslations('AccessibilitySkipLinks')

  return (
    <a href="#main-content" className="skip-links sr-only focus:not-sr-only">
      {t('skipToMain')}
    </a>
  )
}
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
