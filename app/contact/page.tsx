'use client'

import AnimatedButton from '@/components/AnimatedButton'// import Reveal from '@/components/Reveal'
import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import QuickNavButtons from '@/components/QuickNavButtons'

export default function ContactPage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string|null>(null)
  const [errors, setErrors] = useState<any>({})
  const [touched, setTouched] = useState<any>({})
  const [form, setForm] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    contactMethod: '',
    timeline: 'immediate',
  })
  const searchParams = useSearchParams()
  const formRef = useRef<HTMLFormElement | null>(null)

  useEffect(() => {
    const subjectParam = searchParams?.get('subject')
    if (subjectParam) setForm(f => ({ ...f, subject: subjectParam }))
  }, [searchParams])

  // Validación en tiempo real
  useEffect(() => {
    validate()
  }, [form])

  function validate() {
    const newErrors: any = {}
    if (!form.name) newErrors.name = 'Name is required.'
    if (!form.organization) newErrors.organization = 'Organization is required.'
    if (!form.email) newErrors.email = 'Email is required.'
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) newErrors.email = 'Invalid email.'
    if (!form.subject) newErrors.subject = 'Please select a subject.'
    if (!form.message) newErrors.message = 'Message is required.'
    if (!form.contactMethod) newErrors.contactMethod = 'Select a contact method.'
    setErrors(newErrors)
    return newErrors
  }

  function handleChange(e: any) {
    const { name, value, type } = e.target
    setForm(f => ({ ...f, [name]: type === 'radio' ? value : value }))
  }

  function handleBlur(e: any) {
    setTouched((t: any) => ({ ...t, [e.target.name]: true }))
  }

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setTouched({
      name: true,
      organization: true,
      email: true,
      subject: true,
      message: true,
      contactMethod: true,
    })
    const errs = validate()
    if (Object.keys(errs).length > 0) return
    setLoading(true)
    setSuccess(null)
    await new Promise((r) => setTimeout(r, 1200))
    setLoading(false)
    setSuccess('Your inquiry was submitted successfully. We will engage selectively.')
    setForm({
      name: '',
      organization: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      contactMethod: '',
      timeline: 'immediate',
    })
    setTouched({})
    if (formRef.current) formRef.current.reset()
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
  <form ref={formRef} onSubmit={submit} className="synarch-form grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/5 p-6 rounded-xl border border-white/10" noValidate>
          <div className="form-row grid grid-cols-1 md:grid-cols-2 gap-6 md:col-span-2">
            <div className="form-group">
              <label htmlFor="name" className="block text-sm text-white/70 mb-1">Name *</label>
              <input id="name" name="name" required className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 outline-none focus:border-white/30" value={form.name} onChange={handleChange} onBlur={handleBlur} />
              {touched.name && errors.name && <div className="text-red-400 text-xs mt-1">{errors.name}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="organization" className="block text-sm text-white/70 mb-1">Organization *</label>
              <input id="organization" name="organization" required className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 outline-none focus:border-white/30" value={form.organization} onChange={handleChange} onBlur={handleBlur} />
              {touched.organization && errors.organization && <div className="text-red-400 text-xs mt-1">{errors.organization}</div>}
            </div>
          </div>

          <div className="form-row grid grid-cols-1 md:grid-cols-2 gap-6 md:col-span-2">
            <div className="form-group">
              <label htmlFor="email" className="block text-sm text-white/70 mb-1">Email *</label>
              <input id="email" name="email" type="email" required className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 outline-none focus:border-white/30" value={form.email} onChange={handleChange} onBlur={handleBlur} />
              {touched.email && errors.email && <div className="text-red-400 text-xs mt-1">{errors.email}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="phone" className="block text-sm text-white/70 mb-1">Phone</label>
              <input id="phone" name="phone" type="tel" className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 outline-none focus:border-white/30" value={form.phone} onChange={handleChange} />
            </div>
          </div>

          <div className="form-group md:col-span-2">
            <label htmlFor="subject" className="block text-sm text-white/70 mb-1">Subject *</label>
            <select
              id="subject"
              name="subject"
              required
              className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 outline-none focus:border-white/30"
              value={form.subject}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="">Select inquiry type</option>
              <option value="strategic-partnership">Strategic Partnership Inquiry</option>
              <option value="research-collaboration">Research Collaboration</option>
              <option value="investment-opportunity">Investment Opportunity</option>
              <option value="media-press">Media & Press</option>
              <option value="general">General Inquiry</option>
            </select>
            {touched.subject && errors.subject && <div className="text-red-400 text-xs mt-1">{errors.subject}</div>}
          </div>

          <div className="form-group md:col-span-2">
            <label htmlFor="message" className="block text-sm text-white/70 mb-1">Message *</label>
            <textarea id="message" name="message" rows={6} required placeholder="Describe your inquiry and how it aligns with our mission..." className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 outline-none focus:border-white/30" value={form.message} onChange={handleChange} onBlur={handleBlur} />
            {touched.message && errors.message && <div className="text-red-400 text-xs mt-1">{errors.message}</div>}
          </div>

          <div className="form-row grid grid-cols-1 md:grid-cols-2 gap-6 md:col-span-2">
            <div className="form-group">
              <label className="block text-sm text-white/70 mb-1">Preferred Contact Method *</label>
              <div className="radio-group flex items-center gap-4">
                <div className="flex items-center gap-2"><input type="radio" id="contact-email" name="contactMethod" value="email" checked={form.contactMethod==='email'} onChange={handleChange} onBlur={handleBlur} /><label htmlFor="contact-email">Email</label></div>
                <div className="flex items-center gap-2"><input type="radio" id="contact-phone" name="contactMethod" value="phone" checked={form.contactMethod==='phone'} onChange={handleChange} onBlur={handleBlur} /><label htmlFor="contact-phone">Phone</label></div>
                <div className="flex items-center gap-2"><input type="radio" id="contact-secure" name="contactMethod" value="secure" checked={form.contactMethod==='secure'} onChange={handleChange} onBlur={handleBlur} /><label htmlFor="contact-secure">Secure Channel</label></div>
              {touched.contactMethod && errors.contactMethod && <div className="text-red-400 text-xs mt-1">{errors.contactMethod}</div>}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="timeline" className="block text-sm text-white/70 mb-1">Timeline</label>
              <select id="timeline" name="timeline" className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 outline-none focus:border-white/30" value={form.timeline} onChange={handleChange}>
                <option value="immediate">Immediate</option>
                <option value="week">Within 1 Week</option>
                <option value="month">Within 1 Month</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>
          </div>

          <div className="form-actions md:col-span-2 flex flex-wrap gap-3 items-center">
            <AnimatedButton loading={loading} type="submit">{/* disabled visual solo */}Submit Inquiry</AnimatedButton>
            <a href="/capability-brief.pdf" download>
              <AnimatedButton variant="secondary">Download Capability Brief</AnimatedButton>
            </a>
            <AnimatedButton
              variant="secondary"
              onClick={() => {
                const el = document.getElementById('schedule-section')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
            >Schedule Strategic Consultation</AnimatedButton>
          </div>
      {success && (
        <div className="max-w-4xl mx-auto mt-6 text-center">
          <div className="bg-green-900/80 text-green-200 px-6 py-4 rounded-lg inline-block shadow-lg animate-fade-in">
            {success}
          </div>
        </div>
      )}
        </form>
      </section>

      <section className="max-w-4xl mx-auto mt-12 contact-info fade-in-up">
        <div className="direct-contact">
          <h3 className="font-serif text-xl mb-2">Direct Contact</h3>
          <p>Email: <a className="underline" href="mailto:contact@synarch.global">contact@synarch.global</a></p>
          <p className="note text-white/60 text-sm">For verified partners and collaborators, additional secure channels are available upon request.</p>
        </div>
      </section>

      <section id="schedule-section" className="max-w-4xl mx-auto additional-cta fade-in-up mt-8">
        <div className="cta-buttons flex items-center gap-3">
          <a href="/capability-brief.pdf" download>
            <AnimatedButton variant="secondary">Download Capability Brief</AnimatedButton>
          </a>
          <AnimatedButton
            variant="secondary"
            onClick={() => {
              const el = document.getElementById('schedule-section')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
          >Schedule Strategic Consultation</AnimatedButton>
        </div>
        <div className="mt-8 bg-white/5 rounded-xl p-6 border border-white/10 text-center">
          <h3 className="font-serif text-xl mb-2">Strategic Consultation</h3>
          <p className="text-white/80 mb-2">To schedule a strategic consultation, please submit the form above and indicate your preferred timeline. Our team will reach out to coordinate a session tailored to your needs.</p>
          <p className="text-white/60 text-sm">(Integración con un sistema de agendamiento externo estará disponible próximamente.)</p>
        </div>
      </section>
      <div className="py-16 flex items-center justify-center">
        <QuickNavButtons />
      </div>
    </main>
  )
}
