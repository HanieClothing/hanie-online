import { Client } from '@/utils/supabase/client'

export const getProductsByCategory = (client: Client, categorySlug: string) => {
  return client
    .rpc('get_products_by_category', {
      category_slug: categorySlug,
    })
    .throwOnError()
}

export const getProductVariantsByCode = (client: Client, code: string) => {
  return client
    .rpc('get_product_variants_by_code', {
      product_code: code,
    })
    .throwOnError()
}

export const getProductRecommendations = (client: Client, productCode: string) => {
  return client
    .rpc('get_product_recommendations', {
      product_code: productCode,
    })
    .throwOnError()
}
