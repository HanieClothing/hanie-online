import { Client } from '@/utils/supabase/client'

export const addCartItem = async (client: Client, productVariantId: number) => {
  return client
    .rpc('add_cart_item', {
      product_variant_id: productVariantId,
    })
    .throwOnError()
}

export const deleteCartItem = async (client: Client, cartItemId: number) => {
  return client
    .rpc('delete_cart_item', {
      cart_item_id: cartItemId,
    })
    .throwOnError()
}

export const updateCartItemQuantity = async (
  client: Client,
  { cartItemId, quantity }: { cartItemId: number; quantity: number }
) => {
  return client
    .rpc('update_cart_item_quantity', {
      cart_item_id: cartItemId,
      quantity,
    })
    .throwOnError()
}
