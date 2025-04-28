'use client'
import { useEffect, useState } from 'react'

import { Checkbox } from '@/components/ui/checkbox'
import { Skeleton } from '@/components/ui/skeleton'
import {
  useCartItemsQuery,
  useDeleteCartItemMutation,
  useUpdateCartItemQuantityMutation,
} from '@/hooks/cart'
import { LocalCartItem } from '@/types/cart'
import { cn } from '@/utils/cn'
import { formatToRM } from '@/utils/currency'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import {
  CheckIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
  XMarkIcon as XMarkIconMini,
} from '@heroicons/react/20/solid'

import CartRecommendationsSection from './components/cart-recommendations-section'
import toast from 'react-hot-toast'
import { XCircleIcon } from 'lucide-react'

const CartPage = () => {
  const { data: cartItems, isLoading, isError } = useCartItemsQuery()
  const deleteCartItemMutation = useDeleteCartItemMutation()
  const updateCartItemQuantityMutation = useUpdateCartItemQuantityMutation()

  const [localCartItems, setLocalCartItems] = useState<LocalCartItem[]>([])
  const selectedLocalCartItems = localCartItems.filter(
    (item) => item.isSelected
  )

  const toggleItemSelection = (itemId: number) => {
    setLocalCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, isSelected: !item.isSelected } : item
      )
    )
  }

  useEffect(() => {
    if (isLoading || isError || !cartItems || cartItems.length <= 0) return

    setLocalCartItems(cartItems.map((item) => ({ ...item, isSelected: false })))
  }, [cartItems])

  const subtotal = selectedLocalCartItems.reduce(
    (total, item) => total + item.original_price * item.quantity,
    0
  )

  // 10 (West, 300 free), 15 (East, 350 free), 25 (Singapore, 500 free)
  const shippingEstimate = selectedLocalCartItems.length > 0 ? 10 : 0
  const totalDiscount = selectedLocalCartItems.reduce(
    (total, item) =>
      total + (item.original_price - item.selling_price) * item.quantity,
    0
  )
  const orderTotal = subtotal + shippingEstimate - totalDiscount

  const handleDelete = async (cartItemId: number) => {
    const updatedCartItems = localCartItems.filter(
      (item) => item.id !== cartItemId
    )
    setLocalCartItems(updatedCartItems)

    deleteCartItemMutation.mutate(cartItemId)
  }

  const handleQuantityChange = async ({
    cartItemId,
    quantity,
  }: {
    cartItemId: number
    quantity: number
  }) => {
    const currentItem = localCartItems.find((item) => item.id === cartItemId)

    if (currentItem && currentItem.quantity === quantity) return

    const updatedCartItems = localCartItems.map((item) =>
      item.id === cartItemId ? { ...item, quantity } : item
    )
    setLocalCartItems(updatedCartItems)

    updateCartItemQuantityMutation.mutate({ cartItemId, quantity })
  }

  const handleCheckout: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cartItems: selectedLocalCartItems })
    })

    if (!response.ok) {
      toast.error('Failed to checkout.', {
        icon: <XCircleIcon fill="#000" className="text-white" />,
      })
      return
    }

    const data = await response.json()

    if (data.url) {
      window.location.href = data.url
    } else {
      console.error('Checkout session creation failed', data.error)
    }
  }

  return (
    <div className="bg-white">
      <main className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Shopping Cart
        </h1>

        <form onSubmit={handleCheckout} className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>

            <ul
              role="list"
              className="divide-y divide-gray-200 border-t border-b border-gray-200"
            >
              {isLoading &&
                Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="flex py-6 sm:py-10">
                    <div className="shrink-0">
                      <Skeleton className="size-24 rounded-md sm:size-48" />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                      <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                        <div>
                          <Skeleton className="w-full h-4" />

                          <div className="mt-1 flex">
                            <Skeleton className="w-8 h-4" />
                            <Skeleton className="w-8 h-4 ml-2" />
                          </div>

                          <Skeleton className="w-full h-4 mt-1" />
                        </div>

                        <div className="mt-4 sm:mt-0 sm:pr-9">
                          <div className="inline-grid w-full max-w-16 grid-cols-1">
                            <Skeleton className="w-full h-4 col-start-1 row-start-1 rounded-md" />
                          </div>

                          <div className="absolute top-0 right-0">
                            <Skeleton className="size-5" />
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Skeleton className="h-4 w-[100px]" />
                      </div>
                    </div>
                  </div>
                ))}
              {!isLoading &&
                !isError &&
                localCartItems &&
                localCartItems.length > 0 &&
                localCartItems.map((item, index) => (
                  <li key={item.id} className="flex py-6 sm:py-10">
                    <div className="flex items-center">
                      <Checkbox
                        checked={item.isSelected}
                        onClick={() => toggleItemSelection(item.id)}
                        className="size-5 rounded transition-all duration-200"
                      />
                    </div>

                    <div className="ml-4 shrink-0">
                      <img
                        alt={item.name}
                        src={item.image_url}
                        className="size-24 rounded-md object-cover sm:size-48"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                      <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                        <div>
                          <div className="flex justify-between">
                            <h3 className="text-sm">
                              <a
                                href="#"
                                className="font-medium text-gray-700 hover:text-gray-800"
                              >
                                {item.name}
                              </a>
                            </h3>
                          </div>
                          <div className="mt-1 flex text-sm">
                            <p className="text-gray-500">{item.colour}</p>
                            {item.size ? (
                              <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">
                                {item.size}
                              </p>
                            ) : null}
                          </div>
                          <p
                            className={cn(
                              item.original_price - item.selling_price > 0
                                ? 'text-red-800'
                                : 'text-gray-900',
                              'mt-1 text-sm font-medium'
                            )}
                          >
                            {formatToRM(item.selling_price)}
                          </p>
                        </div>

                        <div className="mt-4 sm:mt-0 sm:pr-9">
                          <div className="inline-grid w-full max-w-16 grid-cols-1">
                            <select
                              id={`quantity-${index}`}
                              name={`quantity-${index}`}
                              aria-label={`Quantity, ${item.name}`}
                              className="col-start-1 row-start-1 appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6"
                              value={item.quantity}
                              onChange={(e) =>
                                handleQuantityChange({
                                  cartItemId: item.id,
                                  quantity: parseInt(e.target.value),
                                })
                              }
                            >
                              {Array.from(
                                { length: Math.min(item.available_stock, 10) },
                                (_, i) => i + 1
                              ).map((value) => (
                                <option key={value} value={value}>
                                  {value}
                                </option>
                              ))}
                            </select>
                            <ChevronDownIcon
                              aria-hidden="true"
                              className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                            />
                          </div>

                          <div className="absolute top-0 right-0">
                            <button
                              onClick={() => handleDelete(item.id)}
                              type="button"
                              className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                            >
                              <span className="sr-only">Remove</span>
                              <XMarkIconMini
                                aria-hidden="true"
                                className="size-5"
                              />
                            </button>
                          </div>
                        </div>
                      </div>

                      <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                        {item.status === 'Active' ? (
                          <CheckIcon
                            aria-hidden="true"
                            className="size-5 shrink-0 text-green-500"
                          />
                        ) : (
                          <ClockIcon
                            aria-hidden="true"
                            className="size-5 shrink-0 text-gray-300"
                          />
                        )}

                        <span>
                          {item.status === 'Active'
                            ? 'In stock'
                            : `Ships in 3-4 weeks`}
                        </span>
                      </p>
                    </div>
                  </li>
                ))}
            </ul>

            {!isLoading &&
              !isError &&
              localCartItems &&
              localCartItems.length <= 0 && (
                <div className="mt-4 text-gray-500">
                  <p>Your shopping cart is empty.</p>
                </div>
              )}
          </section>

          {/* Order summary */}
          {localCartItems && localCartItems.length > 0 && (
            <section
              aria-labelledby="summary-heading"
              className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
            >
              <h2
                id="summary-heading"
                className="text-lg font-medium text-gray-900"
              >
                Order summary
              </h2>

              <dl className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">Subtotal</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {formatToRM(subtotal ?? 0)}
                  </dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="flex items-center text-sm text-gray-600">
                    <span>Shipping estimate</span>
                    <a
                      href="#"
                      className="ml-2 shrink-0 text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">
                        Learn more about how shipping is calculated
                      </span>
                      <QuestionMarkCircleIcon
                        aria-hidden="true"
                        className="size-5"
                      />
                    </a>
                  </dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {formatToRM(shippingEstimate)}
                  </dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="flex text-sm text-gray-600">
                    <span>Total Discount</span>
                    <a
                      href="#"
                      className="ml-2 shrink-0 text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">
                        Learn more about how discount is calculated
                      </span>
                      <QuestionMarkCircleIcon
                        aria-hidden="true"
                        className="size-5"
                      />
                    </a>
                  </dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {formatToRM(totalDiscount)}
                  </dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="text-base font-medium text-gray-900">
                    Order total
                  </dt>
                  <dd className="text-base font-medium text-gray-900">
                    {formatToRM(orderTotal)}
                  </dd>
                </div>
              </dl>

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full rounded-md border border-transparent bg-black px-4 py-3 text-base font-medium text-white shadow-xs hover:bg-black/70 focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-gray-50 focus:outline-hidden"
                >
                  Checkout
                </button>
              </div>
            </section>
          )}
        </form>

        <CartRecommendationsSection />
      </main>
    </div>
  )
}

export default CartPage;
