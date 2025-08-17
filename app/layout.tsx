import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Background3D from '@/components/Background3D'
import ClientLayout from '@/components/ClientLayout'

// Font configurations
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SYNARCH',
  description: 'Architects of Inevitability.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className={`${inter.className} bg-[#111111] text-white antialiased`}>
        <Background3D />
        <div className="relative z-10">
          <ClientLayout>{children}</ClientLayout>
        </div>
      </body>
    </html>
  )
} 