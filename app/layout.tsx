import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SYNARCH',
  description: 'SYNARCH Landing Page',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
} 