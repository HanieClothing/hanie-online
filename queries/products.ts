import { Client } from '@/utils/supabase/client'

export function getProductsByCategory(client: Client, categorySlug: string) {
  return client
    .rpc('get_products_by_category', {
      category_slug: categorySlug,
    })
    .throwOnError()
}

export function getProductByCode(client: Client, code: string) {
  return client
    .rpc('get_product_by_code', {
      product_code: code,
    })
    .throwOnError()
}
