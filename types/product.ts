export type ProductSize = {
  name: string
  description: string
}

export type ProductColour = {
  name: string
  hexCode: string
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

export type RawProduct = {
  code: string
  category_id: number
  subcategory_id: number
  name: string
  description: string | null
  purchased_price: number
  selling_price: number
  product_variant_id: number
  images: string[]
  colour: string
  colour_hex: string
  size: string
  size_description: string
  status_id: number | null
  quantity: number
}

export type TransformedProduct = {
  code: string
  name: string
  category_id: number
  subcategory_id: number
  description: string | null
  purchased_price: number
  selling_price: number
  status_id: number | null
  variants: ProductVariant[]
  availableColours: ProductColour[]
  availableSizes: ProductSize[]
  images: Record<string, string[]>
}
