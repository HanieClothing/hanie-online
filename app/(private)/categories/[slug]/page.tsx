'use client'
import { useParams } from 'next/navigation'
import { useState } from 'react'

import ProductCard from '@/components/product-card'
import { Skeleton } from '@/components/ui/skeleton'
import { useCategoryQuery } from '@/hooks/categories'
import { useProductsByCategoryQuery } from '@/hooks/products'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { XMarkIcon } from '@heroicons/react/24/outline'

const filters = [
  {
    id: 'colours',
    name: 'Colours',
    options: [
      { value: 'white', label: 'White' },
      { value: 'black', label: 'Black' },
      { value: 'grey', label: 'Grey' },
      { value: 'blue', label: 'Blue' },
      { value: 'olive', label: 'Olive' },
      { value: 'tan', label: 'Tan' },
    ],
  },
  {
    id: 'sizes',
    name: 'Sizes',
    options: [
      { value: 'xs', label: 'XS' },
      { value: 's', label: 'S' },
      { value: 'm', label: 'M' },
      { value: 'l', label: 'L' },
      { value: 'xl', label: 'XL' },
      { value: '2xl', label: '2XL' },
    ],
  },
]

export default function Category() {
  const { slug } = useParams<{ slug: string }>()
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const {
    data: category,
    isLoading: isCategoryLoading,
    isError: isCategoryError,
  } = useCategoryQuery(slug)
  const {
    data: products,
    isLoading: isProductsLoading,
    isError: isProductsError,
  } = useProductsByCategoryQuery(slug)

  return (
    <div>
      {/* Mobile filter dialog */}
      <Dialog
        open={mobileFiltersOpen}
        onClose={setMobileFiltersOpen}
        className="relative z-40 sm:hidden"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
        />

        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl transition duration-300 ease-in-out data-closed:translate-x-full"
          >
            <div className="flex items-center justify-between px-4">
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="-mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>

            {/* Filters */}
            <form className="mt-4">
              {filters.map((section) => (
                <Disclosure
                  key={section.name}
                  as="div"
                  className="border-t border-gray-200 px-4 py-6"
                >
                  <h3 className="-mx-2 -my-3 flow-root">
                    <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-sm text-gray-400">
                      <span className="font-medium text-gray-900">
                        {section.name}
                      </span>
                      <span className="ml-6 flex items-center">
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="size-5 rotate-0 transform group-data-open:-rotate-180"
                        />
                      </span>
                    </DisclosureButton>
                  </h3>
                  <DisclosurePanel className="pt-6">
                    <div className="space-y-6">
                      {section.options.map((option, optionIdx) => (
                        <div key={option.value} className="flex gap-3">
                          <div className="flex h-5 shrink-0 items-center">
                            <div className="group grid size-4 grid-cols-1">
                              <input
                                defaultValue={option.value}
                                id={`filter-mobile-${section.id}-${optionIdx}`}
                                name={`${section.id}[]`}
                                type="checkbox"
                                className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                              />
                              <svg
                                fill="none"
                                viewBox="0 0 14 14"
                                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                              >
                                <path
                                  d="M3 8L6 11L11 3.5"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="opacity-0 group-has-checked:opacity-100"
                                />
                                <path
                                  d="M3 7H11"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="opacity-0 group-has-indeterminate:opacity-100"
                                />
                              </svg>
                            </div>
                          </div>
                          <label
                            htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                            className="ml-3 text-sm text-gray-500"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </DisclosurePanel>
                </Disclosure>
              ))}
            </form>
          </DialogPanel>
        </div>
      </Dialog>

      <main>
        <div className="w-full">
          <div>
            {isCategoryLoading && (
              <>
                <Skeleton className="h-8 w-[250px] mx-auto" />
                <Skeleton className="mt-4 h-8 w-full max-w-3xl mx-auto" />
              </>
            )}
            {!isCategoryLoading && !isCategoryError && category && (
              <div className="relative">
                {category.banner_image_url ? (
                  <img
                    className="h-[500px] w-full object-cover"
                    src={category.banner_image_url}
                  />
                ) : (
                  <div className="bg-white h-[500px] w-full" />
                )}

                <div className="bg-black/50 absolute inset-0" />

                <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                  <h1 className="text-4xl font-bold text-center tracking-tight text-gray-100">
                    {category.name}
                  </h1>
                  <p className="mx-auto mt-4 max-w-3xl text-center text-base text-gray-100">
                    {category.description}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Filters */}
          <section
            aria-labelledby="filter-heading"
            className="border-t border-gray-200 pt-6 mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            <h2 id="filter-heading" className="sr-only">
              Product filters
            </h2>

            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="inline-block text-sm font-medium text-gray-700 hover:text-gray-900 sm:hidden"
              >
                Filters
              </button>

              <PopoverGroup className="hidden sm:flex sm:items-baseline sm:space-x-8">
                {filters.map((section, sectionIdx) => (
                  <Popover
                    key={section.name}
                    id="menu"
                    className="relative inline-block text-left"
                  >
                    <div>
                      <PopoverButton className="group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                        <span>{section.name}</span>
                        {sectionIdx === 0 ? (
                          <span className="ml-1.5 rounded-sm bg-gray-200 px-1.5 py-0.5 text-xs font-semibold text-gray-700 tabular-nums">
                            1
                          </span>
                        ) : null}
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                        />
                      </PopoverButton>
                    </div>

                    <PopoverPanel
                      transition
                      className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white p-4 ring-1 shadow-2xl ring-black/5 transition focus:outline-hidden data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[enter]:ease-out data-[leave]:duration-75 data-[leave]:ease-in"
                    >
                      <form className="space-y-4">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex gap-3">
                            <div className="flex h-5 shrink-0 items-center">
                              <div className="group grid size-4 grid-cols-1">
                                <input
                                  defaultValue={option.value}
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  type="checkbox"
                                  className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-black checked:bg-black indeterminate:border-black indeterminate:bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                />
                                <svg
                                  fill="none"
                                  viewBox="0 0 14 14"
                                  className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                >
                                  <path
                                    d="M3 8L6 11L11 3.5"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-[:checked]:opacity-100"
                                  />
                                  <path
                                    d="M3 7H11"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                  />
                                </svg>
                              </div>
                            </div>
                            <label
                              htmlFor={`filter-${section.id}-${optionIdx}`}
                              className="pr-6 text-sm font-medium whitespace-nowrap text-gray-900"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </form>
                    </PopoverPanel>
                  </Popover>
                ))}
              </PopoverGroup>
            </div>
          </section>

          {/* Product grid */}
          <section
            aria-labelledby="products-heading"
            className="my-8 mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid gap-x-6 gap-y-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
              {isProductsLoading &&
                Array.from({ length: 4 }).map((_, index) => (
                  <div key={index}>
                    <Skeleton className="w-full aspect-[3/4] rounded-lg" />

                    <div className="mt-4 flex items-center justify-between">
                      <Skeleton className="w-1/2 h-4" />
                      <Skeleton className="w-1/3 h-4" />
                    </div>

                    <div className="flex items-center justify-start space-x-3 pt-2">
                      <Skeleton className="size-4 rounded-full" />
                      <Skeleton className="size-4 rounded-full" />
                      <Skeleton className="size-4 rounded-full" />
                    </div>

                    <div className="flex items-center justify-start space-x-2 pt-2">
                      <Skeleton className="size-4 rounded" />
                      <Skeleton className="size-4 rounded" />
                      <Skeleton className="size-4 rounded" />
                    </div>
                  </div>
                ))}

              {!isProductsLoading &&
                !isProductsError &&
                products &&
                products.map((product) => (
                  <ProductCard
                    key={product.code}
                    id={product.id}
                    code={product.code}
                    name={product.name}
                    imageUrl={product.image_url}
                    availableColours={product.available_colours}
                    availableSizes={product.available_sizes}
                    originalPrice={product.original_price}
                    sellingPrice={product.selling_price}
                  />
                ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
