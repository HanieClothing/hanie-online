'use client'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import Loading from '@/components/loading'
import { useAddCartItemMutation } from '@/hooks/cart'
import { useProductByCodeQuery } from '@/hooks/products'
import { useLoadingStore } from '@/stores/loading'
import { cn } from '@/utils/cn'
import { formatToRM } from '@/utils/currency'
import { Radio, RadioGroup } from '@headlessui/react'

const relatedProducts = [
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc:
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-02.jpg',
    imageAlt: "Front of men's Basic Tee in white.",
    price: '$35',
    colour: 'Aspen White',
  },
  // More products...
]

export default function Product() {
  const { code } = useParams()
  const { isLoading } = useLoadingStore()
  const { data: product } = useProductByCodeQuery(code?.toString() ?? '')
  const addCartItemMutation = useAddCartItemMutation()
  const [selectedColour, setSelectedColour] = useState('')
  const [selectedSize, setSelectedSize] = useState('')

  useEffect(() => {
    if (product?.availableColours?.length && !selectedColour) {
      setSelectedColour(product.availableColours[0].name)
    }
  }, [product, selectedColour])

  const addToCart: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault()

    if (!selectedColour) {
      alert('Please select a colour.')
      return
    }

    if (!selectedSize) {
      alert('Please select a size.')
      return
    }

    if (!product) return

    const productVariant = product.variants.find(
      (variant) =>
        variant.colour === selectedColour && variant.size === selectedSize
    )
    if (!productVariant) return

    await addCartItemMutation.mutateAsync(productVariant.id)
  }

  return (
    <div className="bg-white">
      <main className="mx-auto mt-8 max-w-2xl px-4 pb-16 sm:px-6 sm:pb-24 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="flex justify-between">
              <h1 className="text-[30px] font-medium text-gray-900">
                {product?.name}
              </h1>
              <p className="text-xl font-medium text-gray-900">
                {formatToRM(product?.selling_price ?? 0)}
              </p>
            </div>
          </div>

          {/* Image gallery */}
          <div className="mt-8 lg:col-span-6 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
            <h2 className="sr-only">Images</h2>

            {product && product.images && (
              <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
                {product.images[
                  selectedColour ?? product.availableColours[0].name
                ]?.map((image, index) => (
                  <img
                    key={index}
                    alt="product image alt"
                    src={image}
                    className={cn(
                      index === 0
                        ? 'lg:col-span-2 lg:row-span-2'
                        : 'hidden lg:block',
                      'rounded-lg'
                    )}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="mt-8 lg:col-span-6">
            <form>
              {/* Colour picker */}
              <div>
                <h2 className="text-sm font-medium text-gray-900">Colour</h2>

                <fieldset aria-label="Choose a colour" className="mt-2">
                  <RadioGroup
                    value={selectedColour}
                    onChange={setSelectedColour}
                    className="flex items-center gap-x-3"
                  >
                    {product?.availableColours.map((colour) => (
                      <Radio
                        key={colour.name}
                        value={colour.name}
                        aria-label={colour.name}
                        className={cn(
                          'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none data-[checked]:ring-2 data-[checked]:ring-offset-1'
                        )}
                        style={{
                          boxShadow:
                            selectedColour === colour.name
                              ? `0 0 0 2px ${colour.hexCode}`
                              : undefined,
                        }}
                      >
                        <span
                          aria-hidden="true"
                          className="size-8 rounded-full border border-black/10"
                          style={{
                            backgroundColor: colour.hexCode,
                          }}
                        />
                      </Radio>
                    ))}
                  </RadioGroup>
                </fieldset>
              </div>

              {/* Size picker */}
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-medium text-gray-900">Size</h2>
                  <a
                    href="#"
                    className="text-sm font-medium text-black hover:text-black/70"
                  >
                    See sizing chart
                  </a>
                </div>

                <fieldset aria-label="Choose a size" className="mt-2">
                  <RadioGroup
                    value={selectedSize}
                    onChange={setSelectedSize}
                    className="grid grid-cols-3 gap-3 sm:grid-cols-6"
                  >
                    {product?.availableSizes.map((size) => (
                      <Radio
                        key={size.name}
                        value={size.name}
                        className={cn(
                          true
                            ? 'cursor-pointer focus:outline-none'
                            : 'cursor-not-allowed opacity-25',
                          'flex items-center justify-center rounded-md border border-gray-200 bg-white px-3 py-3 text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 data-[checked]:border-transparent data-[checked]:bg-black data-[checked]:text-white data-[checked]:ring-2 data-[checked]:ring-black data-[checked]:ring-offset-2 data-[checked]:hover:bg-black/80 sm:flex-1'
                        )}
                      >
                        {size.name}
                      </Radio>
                    ))}
                  </RadioGroup>
                </fieldset>
              </div>

              <button
                onClick={addToCart}
                type="submit"
                className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-black px-8 py-3 text-base font-medium text-white hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
              >
                {isLoading ? (
                  <Loading className="size-6 text-black/50 animate-spin fill-white" />
                ) : (
                  'Add to Cart'
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Related products */}
        <section aria-labelledby="related-heading" className="mt-16 sm:mt-24">
          <h2
            id="related-heading"
            className="text-lg font-medium text-gray-900"
          >
            Customers also purchased
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="group relative">
                <img
                  alt={relatedProduct.imageAlt}
                  src={relatedProduct.imageSrc}
                  className="aspect-square w-full rounded-md object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                />
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href={relatedProduct.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {relatedProduct.name}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {relatedProduct.colour}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {relatedProduct.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
