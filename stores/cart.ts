import { create } from 'zustand';

import { deleteCartItem, getCartItems } from '@/lib/cart';
import { CartItem } from '@/types/cart';

import { useLoadingStore } from './loading';

type CartState = {
  cartItems: CartItem[]
  error: string | null
  subtotal: number
  shippingEstimate: number
  taxEstimate: number
  orderTotal: number
  fetchCart: () => Promise<void>
  deleteItem: (id: number) => Promise<void>
}

export const useCartStore = create<CartState>((set, get) => ({
  cartItems: [],
  isLoading: false,
  error: null,
  subtotal: 0,
  shippingEstimate: 0,
  taxEstimate: 0,
  orderTotal: 0,

  fetchCart: async () => {
    const setIsLoading = useLoadingStore.getState().setIsLoading

    setIsLoading(true)
    set({ error: null })

    try {
      const items = await getCartItems()
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
    } catch (error: any) {
      set({ error: error.message })
    } finally {
      setIsLoading(false)
    }
  },

  deleteItem: async (id: number) => {
    await deleteCartItem(id)
    await get().fetchCart()
  },
}))
