'use client'

import './globals.css';

import { useEffect } from 'react';

import Footer from '@/components/footer';
import Header from '@/components/header';
import Loading from '@/components/loading';
import { useCartStore } from '@/stores/cart';
import { useCategoryStore } from '@/stores/category';
import { useLoadingStore } from '@/stores/loading';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { isLoading } = useLoadingStore()
  const { cartItems, fetchCartItems } = useCartStore()
  const { categories, fetchCategories } = useCategoryStore()

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

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {isLoading && <Loading />}

        <Header />

        {children}

        <Footer />
      </body>
    </html>
  )
}
