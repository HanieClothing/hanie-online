import { Client } from '@/utils/supabase/client'

export async function addCartItem(client: Client, productVariantId: number) {
  return client
    .rpc('add_cart_item', {
      product_variant_id: productVariantId,
    })
    .throwOnError()
}

export async function deleteCartItem(client: Client, cartItemId: number) {
  return client
    .rpc('delete_cart_item', {
      cart_item_id: cartItemId,
    })
    .throwOnError()
}

export async function updateCartItemQuantity(
  client: Client,
  { cartItemId, quantity }: { cartItemId: number; quantity: number }
) {
  return client
    .rpc('update_cart_item_quantity', {
      cart_item_id: cartItemId,
      quantity,
    })
    .throwOnError()
}
