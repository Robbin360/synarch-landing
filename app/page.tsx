import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Thesis from '@/components/Thesis'
import Entities from '@/components/Entities'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Thesis />
      <Entities />
      <Contact />
      <Footer />
    </main>
  )
} 