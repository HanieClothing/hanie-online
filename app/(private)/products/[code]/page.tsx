'use client'
import { CircleCheckIcon, Loader2Icon, XCircleIcon } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Skeleton } from '@/components/ui/skeleton'
import { useAddCartItemMutation } from '@/hooks/cart'
import { useProductByCodeQuery } from '@/hooks/products'
import { cn } from '@/utils/cn'
import { formatToRM } from '@/utils/currency'
import { Radio, RadioGroup } from '@headlessui/react'
import { PostgrestError } from '@supabase/supabase-js'

import ProductRecommendationsSection from './components/product-recommendations-section'

const ProductPage = () => {
  const { code } = useParams<{ code: string }>()
  const { data: product, isLoading, isError } = useProductByCodeQuery(code)
  const addCartItemMutation = useAddCartItemMutation()

  const [selectedColour, setSelectedColour] = useState('')
  const [selectedSize, setSelectedSize] = useState('')

  const hasDiscount = product
    ? product.originalPrice - product.sellingPrice > 0
    : false

  useEffect(() => {
    if (product?.availableColours?.length && !selectedColour) {
      setSelectedColour(product.availableColours[0].name)
    }
  }, [product, selectedColour])

  const addToCart: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault()

    if (!selectedColour) {
      toast.error('Please select a colour.')
      return
    }

    if (!selectedSize) {
      toast.error('Please select a size.')
      return
    }

    if (!product) return

    const productVariant = product.variants.find(
      (variant) =>
        variant.colour === selectedColour && variant.size === selectedSize
    )
    if (!productVariant) {
      toast.error('Selected variant not found.')
      return
    }

    const toastId = toast.loading('Adding to cart...', {
      icon: <Loader2Icon />,
    })

    try {
      await addCartItemMutation.mutateAsync(productVariant.id)

      toast.success('Added to cart!', {
        id: toastId,
        icon: <CircleCheckIcon fill="#000" className="text-white" />,
      })
    } catch (error) {
      if (error instanceof PostgrestError) {
        toast.error(error.message, {
          id: toastId,
          icon: <XCircleIcon fill="#000" className="text-white" />,
        })
      }
    }
  }

  return (
    <div className="bg-white">
      <main className="mx-auto mt-8 max-w-2xl px-4 pb-16 sm:px-6 sm:pb-24 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="flex justify-between">
              {isLoading && (
                <>
                  <Skeleton className="w-1/2 h-10" />
                  <Skeleton className="w-1/4 h-6" />
                </>
              )}

              {!isLoading && !isError && product && (
                <>
                  <h1 className="text-[30px] font-medium text-gray-900">
                    {product.name}
                  </h1>
                  <div>
                    <p
                      className={cn(
                        hasDiscount ? 'text-red-800' : 'text-black',
                        'text-xl font-medium'
                      )}
                    >
                      {formatToRM(product.sellingPrice)}
                    </p>
                    {hasDiscount && (
                      <p className="text-sm text-right line-through text-gray-400">
                        {formatToRM(product.originalPrice)}
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Image gallery */}
          <div className="mt-8 lg:col-span-6 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
            <h2 className="sr-only">Images</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
              {isLoading &&
                Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    className={cn(
                      index === 0
                        ? 'lg:col-span-2 lg:row-span-2 h-[600px]'
                        : 'hidden lg:block',
                      'rounded-lg w-full'
                    )}
                  />
                ))}

              {!isLoading &&
                !isError &&
                product &&
                product.images[
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
          </div>

          <div className="mt-8 lg:col-span-6">
            <form>
              {/* Colour picker */}
              <div>
                <h2 className="text-sm font-medium text-gray-900">Colour</h2>

                {isLoading && (
                  <div className="flex items-center gap-x-3 mt-2">
                    <Skeleton className="size-8 rounded-full" />
                    <Skeleton className="size-8 rounded-full" />
                    <Skeleton className="size-8 rounded-full" />
                  </div>
                )}

                {!isLoading && !isError && product && (
                  <fieldset aria-label="Choose a colour" className="mt-2">
                    <RadioGroup
                      value={selectedColour}
                      onChange={setSelectedColour}
                      className="flex items-center gap-x-3"
                    >
                      {product.availableColours.map((colour) => (
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
                )}
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

                {isLoading && (
                  <div className="mt-2 grid grid-cols-3 gap-3 sm:grid-cols-6">
                    <Skeleton className="rounded-md w-full h-12" />
                    <Skeleton className="rounded-md w-full h-12" />
                    <Skeleton className="rounded-md w-full h-12" />
                  </div>
                )}

                {!isLoading && !isError && product && (
                  <fieldset aria-label="Choose a size" className="mt-2">
                    <RadioGroup
                      value={selectedSize}
                      onChange={setSelectedSize}
                      className="grid grid-cols-3 gap-3 sm:grid-cols-6"
                    >
                      {product.availableSizes.map((size) => (
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
                )}
              </div>

              <button
                onClick={addToCart}
                type="submit"
                className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-black px-8 py-3 text-base font-medium text-white hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
              >
                Add to Cart
              </button>
            </form>

            <Accordion
              type="single"
              collapsible
              className="w-full mt-8 space-y-8"
            >
              <AccordionItem value="article-details">
                <AccordionTrigger>Article Details</AccordionTrigger>
                <AccordionContent>Article Details</AccordionContent>
              </AccordionItem>
              <AccordionItem value="size-guides">
                <AccordionTrigger>Size Guide</AccordionTrigger>
                <AccordionContent>Size Guide</AccordionContent>
              </AccordionItem>
              <AccordionItem value="care-instructions">
                <AccordionTrigger>Care Instructions</AccordionTrigger>
                <AccordionContent>Care Instructions</AccordionContent>
              </AccordionItem>
              <AccordionItem value="shipping-and-return">
                <AccordionTrigger>Shipping &amp; Return</AccordionTrigger>
                <AccordionContent>Shipping &amp; Return</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        <ProductRecommendationsSection code={code} />
      </main>
    </div>
  )
}

export default ProductPage
