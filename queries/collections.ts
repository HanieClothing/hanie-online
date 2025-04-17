import { Client } from '@/utils/supabase/client'

export const getCollections = (client: Client) => {
  return client.from('collections').select('*').throwOnError()
}

export const getCollectionBySlug = (client: Client, slug: string) => {
  return client
    .from('collections')
    .select('*')
    .eq('slug', slug)
    .throwOnError()
    .single()
}
