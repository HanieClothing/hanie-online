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
