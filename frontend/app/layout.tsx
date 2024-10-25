import React from 'react'
import '@/app/globals.css'

import Header from '@/components/headers/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </head>
      <body className="flex flex-col min-h-[100vh]">
          {children}
      </body>
    </html>
  )
}