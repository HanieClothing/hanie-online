import { create } from 'zustand'

import { getCollections } from '@/lib/collections'
import { Tables } from '@/types/database'

type State = {
  collections: Tables<'collections'>[] | null
  fetchCollections: () => Promise<void>
}

export const useCollectionStore = create<State>((set) => ({
  collections: null,

  fetchCollections: async () => {
    try {
      const data = await getCollections()

      if (!data) return
      set({ collections: data })
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  },
}))
