import { Client } from '@/utils/supabase/client'

export const getCategories = (client: Client) => {
  return client.from('categories').select('*').throwOnError()
}

export const getCategoryBySlug = (client: Client, slug: string) => {
  return client
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .throwOnError()
    .single()
}
