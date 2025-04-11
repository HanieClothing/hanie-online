import { useEffect, useState } from 'react';

import { fetchCategories } from '@/lib/categories';
import { Tables } from '@/types/database';

export const useCategories = () => {
  const [categories, setCategories] = useState<Tables<'categories'>[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchCategories()
        setCategories(data)
      } catch (error: any) {
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    load()
  }, [])

  return { categories, isLoading, error }
}
