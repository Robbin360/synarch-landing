'use client'

import AnimatedButton from '@/components/AnimatedButton'
import Reveal from '@/components/Reveal'
import { useState } from 'react'

export default function ContactPage() {
  const [loading, setLoading] = useState(false)

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    setLoading(false)
    alert('Inquiry submitted. We will engage selectively.')
  }

  return (
    <main className="min-h-screen pt-24 px-6 contact-page">
      <section className="max-w-4xl mx-auto text-center mb-12 hero fade-in-up">
        <h1 className="font-serif text-4xl md:text-6xl font-medium mb-6">Engage With Synarch</h1>
        <p className="text-white/80">For those who understand the nature of our mission</p>
      </section>

      <section className="max-w-4xl mx-auto philosophy fade-in-up mb-8">
        <h2 className="font-serif text-2xl md:text-3xl font-medium mb-3">Our Communication Philosophy</h2>
        <p className="text-white/80">We operate with deliberate opacity. Our work speaks for itself, and our results are our primary form of communication. We engage directly only with those who demonstrate understanding of our mission and can contribute meaningfully to our objectives.</p>
      </section>

      <section className="max-w-4xl mx-auto contact-form fade-in-up">
        <h2 className="font-serif text-2xl md:text-3xl font-medium mb-4">Strategic Inquiry Form</h2>
        <form onSubmit={submit} className="synarch-form grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/5 p-6 rounded-xl border border-white/10">
          <div className="form-row grid grid-cols-1 md:grid-cols-2 gap-6 md:col-span-2">
            <div className="form-group">
              <label htmlFor="name" className="block text-sm text-white/70 mb-1">Name *</label>
              <input id="name" name="name" required className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 outline-none focus:border-white/30" />
            </div>
            <div className="form-group">
              <label htmlFor="organization" className="block text-sm text-white/70 mb-1">Organization *</label>
              <input id="organization" name="organization" required className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 outline-none focus:border-white/30" />
            </div>
          </div>

          <div className="form-row grid grid-cols-1 md:grid-cols-2 gap-6 md:col-span-2">
            <div className="form-group">
              <label htmlFor="email" className="block text-sm text-white/70 mb-1">Email *</label>
              <input id="email" name="email" type="email" required className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 outline-none focus:border-white/30" />
            </div>
            <div className="form-group">
              <label htmlFor="phone" className="block text-sm text-white/70 mb-1">Phone</label>
              <input id="phone" name="phone" type="tel" className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 outline-none focus:border-white/30" />
            </div>
          </div>

          <div className="form-group md:col-span-2">
            <label htmlFor="subject" className="block text-sm text-white/70 mb-1">Subject *</label>
            <select id="subject" name="subject" required className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 outline-none focus:border-white/30">
              <option value="">Select inquiry type</option>
              <option value="strategic-partnership">Strategic Partnership Inquiry</option>
              <option value="research-collaboration">Research Collaboration</option>
              <option value="investment-opportunity">Investment Opportunity</option>
              <option value="media-press">Media & Press</option>
              <option value="general">General Inquiry</option>
            </select>
          </div>

          <div className="form-group md:col-span-2">
            <label htmlFor="message" className="block text-sm text-white/70 mb-1">Message *</label>
            <textarea id="message" name="message" rows={6} required placeholder="Describe your inquiry and how it aligns with our mission..." className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 outline-none focus:border-white/30" />
          </div>

          <div className="form-row grid grid-cols-1 md:grid-cols-2 gap-6 md:col-span-2">
            <div className="form-group">
              <label className="block text-sm text-white/70 mb-1">Preferred Contact Method *</label>
              <div className="radio-group flex items-center gap-4">
                <div className="flex items-center gap-2"><input type="radio" id="contact-email" name="contact-method" value="email" /><label htmlFor="contact-email">Email</label></div>
                <div className="flex items-center gap-2"><input type="radio" id="contact-phone" name="contact-method" value="phone" /><label htmlFor="contact-phone">Phone</label></div>
                <div className="flex items-center gap-2"><input type="radio" id="contact-secure" name="contact-method" value="secure" /><label htmlFor="contact-secure">Secure Channel</label></div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="timeline" className="block text-sm text-white/70 mb-1">Timeline</label>
              <select id="timeline" name="timeline" className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 outline-none focus:border-white/30">
                <option value="immediate">Immediate</option>
                <option value="week">Within 1 Week</option>
                <option value="month">Within 1 Month</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>
          </div>

          <div className="form-actions md:col-span-2 flex flex-wrap gap-3 items-center">
            <AnimatedButton loading={loading}>Submit Inquiry</AnimatedButton>
            <AnimatedButton href="#" variant="secondary">Download Capability Brief</AnimatedButton>
            <AnimatedButton href="#" variant="secondary">Schedule Strategic Consultation</AnimatedButton>
          </div>
        </form>
      </section>

      <section className="max-w-4xl mx-auto mt-12 contact-info fade-in-up">
        <div className="direct-contact">
          <h3 className="font-serif text-xl mb-2">Direct Contact</h3>
          <p>Email: <a className="underline" href="mailto:contact@synarch.global">contact@synarch.global</a></p>
          <p className="note text-white/60 text-sm">For verified partners and collaborators, additional secure channels are available upon request.</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto additional-cta fade-in-up mt-8">
        <div className="cta-buttons flex items-center gap-3">
          <AnimatedButton href="#" variant="secondary">Download Capability Brief</AnimatedButton>
          <AnimatedButton href="#" variant="secondary">Schedule Strategic Consultation</AnimatedButton>
        </div>
      </section>
    </main>
  )
}

