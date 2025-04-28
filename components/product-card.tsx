'use client'
import Link from 'next/link'

import { cn } from '@/utils/cn'
import { formatToRM } from '@/utils/currency'

type Props = {
  id: number
  code: string
  name: string
  imageUrl: string
  availableColours: { id: number; name: string; hex_code: string }[]
  availableSizes: { id: number; name: string; sort_order: number }[]
  originalPrice: number
  sellingPrice: number
}

function ProductCard({
  id,
  code,
  name,
  imageUrl,
  availableColours,
  availableSizes,
  originalPrice,
  sellingPrice,
}: Props) {
  const hasDiscount = originalPrice - sellingPrice > 0

  return (
    <Link key={id} href={`/products/${code}`} className="group">
      <img
        alt={'Product image'}
        src={imageUrl}
        className="aspect-[3/4] rounded-lg object-cover group-hover:opacity-75"
      />
      <div className="mt-4 flex items-start justify-between text-base font-medium text-gray-900">
        <div className='w-1/2 -space-y-1'>
          <h3 className='truncate'>{name}</h3>

          <div>
            <h4 className="sr-only">Available colours</h4>
            <ul
              role="list"
              className="flex items-center justify-start space-x-3 pt-2"
            >
              {availableColours.map((colour) => (
                <li
                  key={colour.id}
                  style={{ backgroundColor: colour.hex_code }}
                  className="size-[22px] rounded-full border border-black/10"
                >
                  <span className="sr-only">{colour.name}</span>
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
              {availableSizes.map((size) => (
                <li key={size.id} className="text-gray-500 text-sm">
                  <span>{size.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <p className={cn(hasDiscount ? 'text-red-800' : 'text-black')}>
            {formatToRM(sellingPrice)}
          </p>

          {hasDiscount && (
            <p className="text-xs text-right line-through text-gray-400">
              {formatToRM(originalPrice)}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
