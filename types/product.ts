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
  availableColours: ProductColour[]
  availableSizes: ProductSize[]
  images: Record<string, string[]>
}
