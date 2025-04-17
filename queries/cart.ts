import { Client } from '@/utils/supabase/client'

export const getCartItems = (client: Client) => {
  return client.rpc('get_cart_items').throwOnError()
}

export const getCartRecommendations = (client: Client) => {
  return client.rpc('get_cart_recommendations').throwOnError()
}
