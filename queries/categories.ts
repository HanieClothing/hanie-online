import { Client } from '@/utils/supabase/client'

export function getCategories(client: Client) {
  return client.from('categories').select('*').throwOnError()
}

export function getCategoryBySlug(client: Client, slug: string) {
  return client
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .throwOnError()
    .single()
}
