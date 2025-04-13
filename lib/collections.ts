import { handleError } from '@/utils/error'
import { supabase } from '@/utils/supabase/client'

export const getCollections = async () => {
  const { data, error } = await supabase.from('collections').select('*')

  if (error) handleError(error, 'getCollections')

  return data
}

export const getCollectionBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from('collections')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) handleError(error, `getCollectionBySlug (slug: ${slug})`)

  return data
}
