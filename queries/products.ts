import { Client } from '@/utils/supabase/client'

export function getProductsByCategory(client: Client, categorySlug: string) {
  return client
    .rpc('get_products_by_category', {
      category_slug: categorySlug,
    })
    .throwOnError()
}

export function getProductVariantsByCode(client: Client, code: string) {
  return client
    .rpc('get_product_variants_by_code', {
      product_code: code,
    })
    .throwOnError()
}

export function getProductRecommendations(client: Client, productCode: string) {
  return client
    .rpc('get_product_recommendations', {
      product_code: productCode,
    })
    .throwOnError()
}
