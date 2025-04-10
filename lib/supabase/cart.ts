import { createClient } from '@/utils/supabase/client'

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
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    console.error('No active user.')
    return
  }

  const { data, error } = await supabase.rpc('get_cart_items', {
    user_id: user.id,
  })

  if (error) {
    console.error('Error fetching categories: ', error)
    throw error
  }

  return data
}
