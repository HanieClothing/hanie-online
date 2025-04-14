import { Client } from '@/utils/supabase/client'

export function getCollections(client: Client) {
  return client.from('collections').select('*').throwOnError()
}

export function getCollectionBySlug(client: Client, slug: string) {
  return client
    .from('collections')
    .select('*')
    .eq('slug', slug)
    .throwOnError()
    .single()
}
