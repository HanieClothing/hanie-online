import {
  getProductRecommendations,
  getProductsByCategory,
  getProductVariantsByCode,
} from '@/queries/products'
import { ProductRecommendation, TransformedProduct } from '@/types/product'
import { useQuery } from '@tanstack/react-query'
import useSupabase from './supabase'

export function useProductsByCategoryQuery(categorySlug: string) {
  const client = useSupabase()
  const queryKey = ['products_by_category']

  const queryFn = async () => {
    return getProductsByCategory(client, categorySlug).then(
      (result) => result.data
    )
  }

  return useQuery({ queryKey, queryFn })
}

export function useProductByCodeQuery(code: string) {
  const client = useSupabase()
  const queryKey = ['product_by_code']

  const queryFn = async () => {
    return getProductVariantsByCode(client, code).then((result) => {
      const data = result.data

      if (!data) return
      if (data.length === 0) return

      const base = data[0]
      const colourMap = new Map<string, { name: string; hexCode: string }>()
      const sizeMap = new Map<string, { name: string; description: string }>()
      const images: Record<string, string[]> = {}

      data.forEach((item) => {
        if (!colourMap.has(item.colour)) {
          colourMap.set(item.colour, {
            name: item.colour,
            hexCode: item.colour_hex,
          })
        }

        if (!sizeMap.has(item.size)) {
          sizeMap.set(item.size, {
            name: item.size,
            description: item.size_description,
          })
        }
      })

      const variants = data.map((item) => ({
        id: item.product_variant_id,
        colour: item.colour,
        colourHex: item.colour_hex,
        size: item.size,
        sizeDescription: item.size_description,
        quantity: item.quantity,
      }))
      const availableColours = Array.from(colourMap.values())
      const availableSizes = Array.from(sizeMap.values())

      availableColours.forEach((colour) => {
        const productImages = data.find(
          (item) => item.colour === colour.name
        )?.images
        if (!productImages) return

        images[colour.name] = productImages
      })

      const transformed: TransformedProduct = {
        code: base.code,
        name: base.name,
        categoryId: base.category_id,
        subcategoryId: base.subcategory_id,
        description: base.description,
        originalPrice: base.original_price,
        sellingPrice: base.selling_price,
        statusId: base.status_id,
        variants,
        availableColours,
        availableSizes,
        images,
      }

      return transformed
    })
  }

  return useQuery({ queryKey, queryFn })
}

export function useProductRecommendationsQuery(productCode: string) {
  const client = useSupabase()
  const queryKey = ['product_recommendations']

  const queryFn = async () => {
    return getProductRecommendations(client, productCode).then(
      (result) => result.data as ProductRecommendation[]
    )
  }

  return useQuery({ queryKey, queryFn })
}
