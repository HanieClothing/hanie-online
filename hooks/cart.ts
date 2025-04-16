import {
  addCartItem,
  deleteCartItem,
  updateCartItemQuantity,
} from '@/mutations/cart'
import { getCartItems, getCartRecommendations } from '@/queries/cart'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import useSupabase from './supabase'

export function useCartItemsQuery() {
  const client = useSupabase()
  const queryKey = ['cart_items']

  const queryFn = async () => {
    return getCartItems(client).then((result) => result.data)
  }

  return useQuery({ queryKey, queryFn })
}

export function useAddCartItemMutation() {
  const client = useSupabase()
  const queryClient = useQueryClient()

  const mutationFn = async (productVariantId: number) => {
    return addCartItem(client, productVariantId).then((result) => result.data)
  }

  return useMutation({
    mutationFn,
    onSuccess: async () => {
      queryClient.refetchQueries({
        queryKey: ['cart_items'],
      })
    },
  })
}

export function useDeleteCartItemMutation() {
  const client = useSupabase()
  const queryClient = useQueryClient()

  const mutationFn = async (cartItemId: number) => {
    return deleteCartItem(client, cartItemId).then((result) => result.data)
  }

  return useMutation({
    mutationFn,
    onSuccess: async () => {
      queryClient.refetchQueries({
        queryKey: ['cart_items'],
      })
    },
  })
}

export function useUpdateCartItemQuantityMutation() {
  const client = useSupabase()
  const queryClient = useQueryClient()

  const mutationFn = async ({
    cartItemId,
    quantity,
  }: {
    cartItemId: number
    quantity: number
  }) => {
    return updateCartItemQuantity(client, { cartItemId, quantity }).then(
      (result) => result.data
    )
  }

  return useMutation({
    mutationFn,
    onSuccess: async () => {
      queryClient.refetchQueries({
        queryKey: ['cart_items'],
      })
    },
  })
}

export function useCartRecommendationsQuery() {
  const client = useSupabase()
  const queryKey = ['cart_recommendations']

  const queryFn = async () => {
    return getCartRecommendations(client).then((result) => result.data)
  }

  return useQuery({ queryKey, queryFn })
}
