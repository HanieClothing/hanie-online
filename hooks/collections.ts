import { getCollectionBySlug, getCollections } from '@/queries/collections'
import { useQuery } from '@tanstack/react-query'
import useSupabase from './supabase'

export function useCollectionsQuery() {
  const client = useSupabase()
  const queryKey = ['collections']

  const queryFn = async () => {
    return getCollections(client).then((result) => result.data)
  }

  return useQuery({ queryKey, queryFn })
}

export function useCollectionQuery(slug: string) {
  const client = useSupabase()
  const queryKey = ['collection', slug]

  const queryFn = async () => {
    return getCollectionBySlug(client, slug).then((result) => result.data)
  }

  return useQuery({ queryKey, queryFn })
}
