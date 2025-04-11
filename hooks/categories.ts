import { useEffect, useState } from 'react';

import { Tables } from '@/database.types';
import { fetchCategories } from '@/lib/categories';

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
