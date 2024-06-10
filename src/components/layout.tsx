import Footer from './footer'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NavbarPage from './navbarPage'

const inter = Inter({ subsets: ['latin'] })

//                                   children             data type
export default function RootLayout({ children }: {children: React.ReactNode }) {
  return (
    <>
      <NavbarPage />
      <main>
        {children}
      </main>
      <Footer />
    </>
  )
}
