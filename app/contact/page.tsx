import React, { Suspense } from 'react'
import ContactForm from '@/components/ContactForm'

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-24 px-6 flex items-center justify-center">Loading...</div>}>
      <ContactForm />
    </Suspense>
  )
}
