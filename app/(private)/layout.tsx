import '../globals.css'

import { Toaster } from 'react-hot-toast'

import Footer from '@/components/footer'
import Header from '@/components/header'
import { QueryProvider } from '@/providers/QueryProvider'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <QueryProvider>
      <html lang="en" suppressHydrationWarning>
        <body>
          <Header />

          {children}

          <Footer />

          <Toaster position="top-center" />
        </body>
      </html>
    </QueryProvider>
  )
}
