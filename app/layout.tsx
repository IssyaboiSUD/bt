import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bayreuth Apartments - Vacation Rentals',
  description: 'Beautiful vacation apartments in Bayreuth, Germany. Book your stay directly and save on booking fees.',
  keywords: 'Bayreuth, vacation rental, apartment, Germany, booking',
  authors: [{ name: 'Bayreuth Apartments' }],
  openGraph: {
    title: 'Bayreuth Apartments - Vacation Rentals',
    description: 'Beautiful vacation apartments in Bayreuth, Germany',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          {children}
        </div>
      </body>
    </html>
  )
}
