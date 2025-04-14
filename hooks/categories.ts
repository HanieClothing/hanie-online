import { getCategories, getCategoryBySlug } from '@/queries/categories'
import { useQuery } from '@tanstack/react-query'

import useSupabase from './supabase'

export function useCategoriesQuery() {
  const client = useSupabase()
  const queryKey = ['categories']

  const queryFn = async () => {
    return getCategories(client).then((result) => result.data)
  }

  return useQuery({ queryKey, queryFn })
}

export function useCategoryQuery(slug: string) {
  const client = useSupabase()
  const queryKey = ['category', slug]

  const queryFn = async () => {
    return getCategoryBySlug(client, slug).then((result) => result.data)
  }

  return useQuery({ queryKey, queryFn })
}
