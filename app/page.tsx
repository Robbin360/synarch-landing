import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Thesis from '@/components/Thesis'
import Entities from '@/components/Entities'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import Reveal from '@/components/Reveal'
import QuickNavButtons from '@/components/QuickNavButtons'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Reveal>
        <Thesis />
      </Reveal>
      <Reveal>
        <Entities />
      </Reveal>
      <Reveal>
        <Contact />
      </Reveal>
      <div className="py-16 flex items-center justify-center">
        <QuickNavButtons />
      </div>
      <Footer />
    </main>
  )
} 