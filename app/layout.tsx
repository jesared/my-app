"use client"

// import type { Metadata } from 'next'

import { Inter as FontSans } from "next/font/google"
import './globals.css'
import {Navbar} from '@/components/navigations/navbar'
import { NextAuthProvider } from "@/app/Providers"
import clsx from 'clsx'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { usePathname } from 'next/navigation'


export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

// export const metadata: Metadata = {
//   title: '',
//   description: '',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
 
  const pathname = usePathname();

  const isDashboard = pathname.startsWith('/dashboard');


  return (
    <html lang="fr">
      <NextAuthProvider>
        <body className={clsx( "min-h-screen bg-background font-sans antialiased",
          fontSans.variable)} suppressHydrationWarning={true}>

          {!isDashboard && <Navbar />}
          
        <ToastContainer position='top-center'/>
          {children}
        </body>
      </NextAuthProvider>
    </html>
  )
}
