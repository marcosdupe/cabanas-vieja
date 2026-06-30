import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Fraunces, Plus_Jakarta_Sans, Geist_Mono } from 'next/font/google'
import './globals.css'

const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  display: 'swap',
})

const jakarta = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Cabañas Only Bikers | Desconexión Rural y Cicloturismo en Carlos Keen',
  description:
    'Cabañas Only Bikers en Carlos Keen, Luján. El refugio premium exclusivo para ciclistas. Concepto NPKW (sin mascotas, sin niños, sin WiFi). Naturaleza, desayuno de campo y desconexión digital total.',
  keywords: [
    'cabañas carlos keen',
    'lujan',
    'cicloturismo',
    'escape rural',
    'cabañas sin wifi',
    'gravel argentina',
    'ciclismo lujan',
  ],
  openGraph: {
    title: 'Cabañas Only Bikers | Desconexión Rural y Cicloturismo en Carlos Keen',
    description:
      'Refugio premium exclusivo para ciclistas en Carlos Keen. Concepto NPKW (No Pets, No Kids, No WiFi) para una desconexión digital absoluta.',
    type: 'website',
    images: ['/images/hero-bg.png'],
  },
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#2f3a2a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      className={`${fraunces.variable} ${jakarta.variable} ${geistMono.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
