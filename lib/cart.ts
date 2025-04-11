import { createClient } from '@/utils/supabase/client';

export const getCartSize = async () => {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    console.error('No active user.')
    return
  }

  const { data, error } = await supabase.rpc('get_cart_size', {
    user_id: user.id,
  })

  if (error) {
    console.error('Error fetching categories: ', error)
    throw error
  }

  return data
}

export const getCartItems = async () => {
  const supabase = await createClient()

  const { data, error } = await supabase.rpc('get_cart_items')

  if (error) {
    console.error('Error fetching cart items: ', error)
    throw error
  }

  return data
}

export const deleteCartItem = async (cartItemId: number) => {
  const supabase = await createClient()

  const { error } = await supabase.rpc('delete_cart_item', {
    cart_item_id: cartItemId,
  })

  if (error) {
    console.error('Error deleting cart item: ', error)
    throw error
  }
}
