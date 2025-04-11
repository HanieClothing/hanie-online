import { PostgrestError } from '@supabase/supabase-js';

export function ensureError(value: unknown): Error {
  if (value instanceof Error) return value

  let stringified = '[Unable to stringify the thrown value]'
  try {
    stringified = JSON.stringify(value)
  } catch {}

  const error = new Error(
    `This value was thrown as is, not through an Error: ${stringified}`
  )
  return error
}

export const handleError = (error: PostgrestError, context: string) => {
  console.error(`Error in ${context}: `, error.message)
  throw error
}
