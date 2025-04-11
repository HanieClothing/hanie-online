import { create } from 'zustand';

import { addCartItem, deleteCartItem, getCartItems } from '@/lib/cart';
import { CartItem } from '@/types/cart';

import { useLoadingStore } from './loading';

type CartState = {
  cartItems: CartItem[] | null
  subtotal: number
  shippingEstimate: number
  taxEstimate: number
  orderTotal: number
  fetchCartItems: () => Promise<void>
  addCartItem: (productVariantId: number) => Promise<void>
  deleteCartItem: (id: number) => Promise<void>
}

export const useCartStore = create<CartState>((set, get) => ({
  cartItems: null,
  subtotal: 0,
  shippingEstimate: 0,
  taxEstimate: 0,
  orderTotal: 0,

  fetchCartItems: async () => {
    const { setIsLoading } = useLoadingStore.getState()

    setIsLoading(true)

    try {
      const items = await getCartItems()
      console.log(items)

      if (!items) return

      const subtotal = items.reduce(
        (total, item) => total + item.selling_price,
        0
      )
      const tax = subtotal * 0.06
      const shipping = 5
      const orderTotal = subtotal + tax + shipping

      set({
        cartItems: items,
        subtotal,
        taxEstimate: tax,
        shippingEstimate: shipping,
        orderTotal,
      })
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    } finally {
      setIsLoading(false)
    }
  },

  addCartItem: async (productVariantId: number) => {
    await addCartItem(productVariantId)
    await get().fetchCartItems()
  },

  deleteCartItem: async (id: number) => {
    await deleteCartItem(id)
    await get().fetchCartItems()
  },
}))
