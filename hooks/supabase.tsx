import { useMemo } from 'react'

import { getSupabaseBrowserClient } from '@/utils/supabase/client'

const useSupabase = () => useMemo(getSupabaseBrowserClient, [])

export default useSupabase
