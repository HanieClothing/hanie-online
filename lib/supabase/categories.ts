import { createClient } from '@/utils/supabase/client'

export const fetchCategories = async () => {
  const supabase = await createClient()
  const { data, error } = await supabase.from('categories').select('*')

  if (error) {
    console.error('Error fetching categories: ', error)
    throw error
  }

  return data
}
