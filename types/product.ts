export type ProductSize = {
  id: number
  name: string
  sort_order: number
}

export type ProductColour = {
  id: number
  name: string
  hex_code: string
}

export type Product = {
  id: number
  name: string
  code: string
  purchased_price: number
  selling_price: number
  category: string
  quantity: number
  available_colours: string[]
  available_sizes: string[]
  image_url: string
}

export type ProductVariant = {
  id: number
  colour: string
  colourHex: string
  size: string
  sizeDescription: string
  quantity: number
}

export type TransformedProduct = {
  code: string
  name: string
  categoryId: number
  subcategoryId: number
  description: string | null
  originalPrice: number
  sellingPrice: number
  statusId: number | null
  variants: ProductVariant[]
  availableColours: {
    name: string
    hexCode: string
  }[]
  availableSizes: {
    name: string
    description: string
  }[]
  images: Record<string, string[]>
}

export type ProductRecommendation = {
  id: number
  code: string
  name: string
  image_url: string
  available_colours: ProductColour[]
  available_sizes: ProductSize[]
  original_price: number
  selling_price: number
}
