'use client'

import Link from 'next/link'

import { Database } from '@/types/database'
import { cn } from '@/utils/cn'
import { formatToRM } from '@/utils/currency'

type Props = {
  product: Database['public']['Functions']['get_products_by_category']['Returns'][number]
}

function ProductCard({ product }: Props) {
  const hasDiscount = product.original_price - product.selling_price > 0

  return (
    <Link key={product.id} href={`/products/${product.code}`} className="group">
      <img
        alt={'Product image'}
        src={product.image_url}
        className="aspect-[3/4] w-full rounded-lg object-cover group-hover:opacity-75"
      />
      <div className="mt-4 flex items-start justify-between text-base font-medium text-gray-900">
        <div>
          <h3>{product.name}</h3>

          <div>
            <h4 className="sr-only">Available colours</h4>
            <ul
              role="list"
              className="flex items-center justify-start space-x-3 pt-2"
            >
              {product.available_colours.map((colour) => (
                <li
                  key={colour}
                  style={{ backgroundColor: colour }}
                  className="size-4 rounded-full border border-black/10"
                >
                  <span className="sr-only">{colour}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="sr-only">Available sizes</h4>
            <ul
              role="list"
              className="flex items-center justify-start space-x-2 pt-2"
            >
              {product.available_sizes.map((size) => (
                <li key={size} className="text-gray-500 text-sm">
                  <span>{size}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <p className={cn(hasDiscount ? 'text-red-800' : 'text-black')}>
            {formatToRM(product.selling_price)}
          </p>

          {hasDiscount && (
            <p className="text-xs text-right line-through text-gray-400">
              {formatToRM(product.original_price)}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
