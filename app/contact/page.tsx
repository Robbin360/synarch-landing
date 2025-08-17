'use client'

import AnimatedButton from '@/components/AnimatedButton'
import Reveal from '@/components/Reveal'
import { useState } from 'react'

export default function ContactPage() {
  const [loading, setLoading] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // simulate submission
    await new Promise((r) => setTimeout(r, 1200))
    setLoading(false)
    alert('Inquiry submitted. We will engage selectively.')
  }

  return (
    <main className="min-h-screen pt-24 px-6">
      <section className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="font-serif text-4xl md:text-6xl font-medium mb-6">Contact</h1>
        <p className="text-white/80">We maintain deliberate opacity. If you understand our mission, proceed.</p>
      </section>

      <section className="max-w-4xl mx-auto">
        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/5 p-6 rounded-xl border border-white/10">
          <div>
            <label className="block text-sm text-white/70 mb-1">Name</label>
            <input required className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 outline-none focus:border-white/30" />
          </div>
          <div>
            <label className="block text-sm text-white/70 mb-1">Organization</label>
            <input className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 outline-none focus:border-white/30" />
          </div>
          <div>
            <label className="block text-sm text-white/70 mb-1">Email</label>
            <input type="email" required className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 outline-none focus:border-white/30" />
          </div>
          <div>
            <label className="block text-sm text-white/70 mb-1">Phone</label>
            <input type="tel" className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 outline-none focus:border-white/30" />
          </div>
          <div>
            <label className="block text-sm text-white/70 mb-1">Subject</label>
            <select className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 outline-none focus:border-white/30">
              <option>General Inquiry</option>
              <option>Partnership</option>
              <option>Investment</option>
              <option>Collaboration</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-white/70 mb-1">Preferred Contact Method</label>
            <select className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 outline-none focus:border-white/30">
              <option>Email</option>
              <option>Phone</option>
              <option>Signal</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-white/70 mb-1">Timeline</label>
            <input placeholder="e.g., Q4 2025" className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 outline-none focus:border-white/30" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-white/70 mb-1">Message</label>
            <textarea required rows={6} className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 outline-none focus:border-white/30" />
          </div>
          <div className="md:col-span-2 flex flex-wrap gap-3 items-center">
            <AnimatedButton loading={loading}>Submit Inquiry</AnimatedButton>
            <AnimatedButton href="#" variant="secondary">Download Capability Brief</AnimatedButton>
            <AnimatedButton href="#" variant="secondary">Schedule Strategic Consultation</AnimatedButton>
          </div>
        </form>
      </section>

      <section className="max-w-4xl mx-auto mt-12">
        <Reveal>
          <p className="text-center text-white/60 text-sm">
            We respond to select inquiries aligned with our mission.
          </p>
        </Reveal>
      </section>
    </main>
  )
}

