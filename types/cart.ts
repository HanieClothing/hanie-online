export type CartItem = {
  id: number
  image_url: string
  name: string
  original_price: number
  selling_price: number
  status: string
  quantity: number
  colour: string
  size: string
  available_stock: number
}

export type LocalCartItem = CartItem & {
  isSelected: boolean
}

export type CartRecommendation = {
  id: number
  code: string
  name: string
  image_url: string
  available_colours: {
    id: number
    name: string
    hex_code: string
  }[]
  available_sizes: {
    id: number
    name: string
    sort_order: number
  }[]
  original_price: number
  selling_price: number
}
