import { handleError } from '@/utils/error';
import { supabase } from '@/utils/supabase/client';

export const getCartItems = async () => {
  const { data, error } = await supabase.rpc('get_cart_items')

  if (error) handleError(error, 'getCartItems')

  return data
}

export const addCartItem = async (productVariantId: number) => {
  const { error } = await supabase.rpc('add_cart_item', {
    product_variant_id: productVariantId,
  })

  if (error)
    handleError(error, `addCartItem (productVariantId: ${productVariantId})`)
}

export const deleteCartItem = async (cartItemId: number) => {
  const { error } = await supabase.rpc('delete_cart_item', {
    cart_item_id: cartItemId,
  })

  if (error) handleError(error, `deleteCartItem (cartItemId: ${cartItemId})`)
}
