import './globals.css'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'
import Header from '@/components/Header'
import BottomNavigation from '@/components/BottomNavigation'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen bg-background`}>
        <Header />
        <main className="flex-1 overflow-y-auto pb-16">
          {children}
        </main>
        <BottomNavigation currentPage="home" />
      </body>
    </html>
  )
}