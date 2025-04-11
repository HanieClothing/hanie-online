'use client'
import './globals.css';

import Footer from '@/components/footer';
import Header from '@/components/header';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <Header />

        {children}

        <Footer />
      </body>
    </html>
  )
}
