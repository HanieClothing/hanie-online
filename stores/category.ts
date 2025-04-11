import { create } from 'zustand';

import { getCategories } from '@/lib/categories';
import { Tables } from '@/types/database';

type State = {
  categories: Tables<'categories'>[] | null
  fetchCategories: () => Promise<void>
}

export const useCategoryStore = create<State>((set) => ({
  categories: null,

  fetchCategories: async () => {
    try {
      const data = await getCategories()

      if (!data) return
      set({ categories: data })
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  },
}))
