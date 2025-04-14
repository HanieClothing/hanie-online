import '../globals.css'

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
        </body>
      </html>
    </QueryProvider>
  )
}
