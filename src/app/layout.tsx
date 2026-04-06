import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Opportunity Engine — AI Business Idea Finder',
  description: 'Find underserved niches and launch businesses in 2 weeks',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
