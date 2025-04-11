import { handleError } from '@/utils/error';
import { supabase } from '@/utils/supabase/client';

export const getCategories = async () => {
  const { data, error } = await supabase.from('categories').select('*')

  if (error) handleError(error, 'getCategories')

  return data
}

export const getCategoryBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) handleError(error, `getCategoryBySlug (slug: ${slug})`)

  return data
}
