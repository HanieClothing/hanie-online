import { Client } from '@/utils/supabase/client'

export function getCartItems(client: Client) {
  return client.rpc('get_cart_items').throwOnError()
}

export function getCartRecommendations(client: Client) {
  return client.rpc('get_cart_recommendations').throwOnError()
}
