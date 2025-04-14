'use client'
import { Skeleton } from '@/components/ui/skeleton'
import { useCartItemsQuery, useDeleteCartItemMutation } from '@/hooks/cart'
import { formatToRM } from '@/utils/currency'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import {
  CheckIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
  XMarkIcon as XMarkIconMini,
} from '@heroicons/react/20/solid'

const relatedProducts = [
  {
    id: 1,
    name: 'Billfold Wallet',
    href: '#',
    imageSrc:
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-01-related-product-01.jpg',
    imageAlt: 'Front of Billfold Wallet in natural leather.',
    price: '$118',
    color: 'Natural',
  },
  // More products...
]

export default function Cart() {
  const { data: cartItems, isLoading, isError } = useCartItemsQuery()
  const deleteCartItemMutation = useDeleteCartItemMutation()

  const subtotal = 0
  const shippingEstimate = 0
  const taxEstimate = 0
  const orderTotal = 0

  const handleDelete = async (cartItemId: number) => {
    deleteCartItemMutation.mutate(cartItemId)
  }

  return (
    <div className="bg-white">
      <main className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Shopping Cart
        </h1>

        <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
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
                cartItems &&
                cartItems.length > 0 &&
                cartItems.map((item, index) => (
                  <li key={item.id} className="flex py-6 sm:py-10">
                    <div className="shrink-0">
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
                          <p className="mt-1 text-sm font-medium text-gray-900">
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
                              defaultValue={item.quantity}
                            >
                              <option value={1}>1</option>
                              <option value={2}>2</option>
                              <option value={3}>3</option>
                              <option value={4}>4</option>
                              <option value={5}>5</option>
                              <option value={6}>6</option>
                              <option value={7}>7</option>
                              <option value={8}>8</option>
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

            {!isLoading && !isError && cartItems && cartItems.length <= 0 && (
              <div>
                <p>Your shopping cart is empty.</p>
              </div>
            )}
          </section>

          {/* Order summary */}
          {cartItems && cartItems.length > 0 && (
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
                    {formatToRM(subtotal)}
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
                    <span>Tax estimate</span>
                    <a
                      href="#"
                      className="ml-2 shrink-0 text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">
                        Learn more about how tax is calculated
                      </span>
                      <QuestionMarkCircleIcon
                        aria-hidden="true"
                        className="size-5"
                      />
                    </a>
                  </dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {formatToRM(taxEstimate)}
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

        {/* Related products */}
        {cartItems && cartItems.length > 0 && (
          <section aria-labelledby="related-heading" className="mt-24">
            <h2
              id="related-heading"
              className="text-lg font-medium text-gray-900"
            >
              You may also like&hellip;
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
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {relatedProduct.name}
                        </a>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {relatedProduct.color}
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
        )}
      </main>
    </div>
  )
}
