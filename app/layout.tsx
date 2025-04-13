'use client'

import './globals.css'

import { useEffect } from 'react'

import Footer from '@/components/footer'
import Header from '@/components/header'
import { Toaster } from '@/components/ui/toaster'
import { useCartStore } from '@/stores/cart'
import { useCategoryStore } from '@/stores/category'
import { useCollectionStore } from '@/stores/collection'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { cartItems, fetchCartItems } = useCartStore()
  const { categories, fetchCategories } = useCategoryStore()
  const { collections, fetchCollections } = useCollectionStore()

  useEffect(() => {
    if (!cartItems) {
      fetchCartItems()
    }
  }, [cartItems, fetchCartItems])

  useEffect(() => {
    if (!categories) {
      fetchCategories()
    }
  }, [categories, fetchCategories])

  useEffect(() => {
    if (!collections) {
      fetchCollections()
    }
  }, [collections, fetchCollections])

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Toaster />

        <Header />

        {children}

        <Footer />
      </body>
    </html>
  )
}
