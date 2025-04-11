import { useEffect, useState } from 'react';

import { deleteCartItem, getCartItems, getCartSize } from '@/lib/cart';
import { CartItem } from '@/types/cart';

export const useCartSize = () => {
  const [cartSize, setCartSize] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        const size = await getCartSize()

        if (!size) return
        setCartSize(size)
      } catch (error: any) {
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    load()
  }, [])

  return { cartSize, isLoading, error }
}

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const subtotal = cartItems.reduce(
    (total, item) => total + item.selling_price,
    0
  )
  const shippingEstimate = 5
  const taxEstimate = subtotal * 0.06
  const orderTotal = subtotal + shippingEstimate + taxEstimate

  const fetchCartItems = async () => {
    setIsLoading(true)

    try {
      const items = await getCartItems()

      if (!items) return
      setCartItems(items)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const deleteCartItemById = async (id: number) => {
    try {
      await deleteCartItem(id)
      await fetchCartItems()
    } catch (error) {
      throw new Error('Failed to delete cart item')
    }
  }

  useEffect(() => {
    fetchCartItems()
  }, [])

  return {
    cartItems,
    subtotal,
    shippingEstimate,
    taxEstimate,
    orderTotal,
    isLoading,
    error,
    refetch: fetchCartItems,
    deleteCartItem: deleteCartItemById,
  }
}
