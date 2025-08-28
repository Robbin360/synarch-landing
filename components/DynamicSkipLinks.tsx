'use client'; // ¡La directiva más importante! Marca este como un Client Component.

import dynamic from 'next/dynamic';

// La lógica de importación dinámica se mueve aquí.
const AccessibilitySkipLinks = dynamic(
  () => import('@/components/AccessibilitySkipLinks'),
  { ssr: false }
);

export default function DynamicSkipLinks() {
  return <AccessibilitySkipLinks />;
}