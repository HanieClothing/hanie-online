'use client'
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';

import { Tables } from '@/database.types';
import {} from '@/types/category';
import { createClient } from '@/utils/supabase/client';
import {
    Dialog, DialogBackdrop, DialogPanel, Tab, TabGroup, TabList, TabPanel, TabPanels
} from '@headlessui/react';
import {} from '@heroicons/react/20/solid';
import { XMarkIcon } from '@heroicons/react/24/outline';

const navigation = {
  categories: [
    {
      name: 'Shop All',
      featured: [
        {
          name: 'Set',
          href: '#',
          imageSrc:
            'https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-01.jpg',
          imageAlt:
            'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
        {
          name: 'Top',
          href: '#',
          imageSrc:
            'https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-02.jpg',
          imageAlt:
            'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
        },
        {
          name: 'Accessories',
          href: '#',
          imageSrc:
            'https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg',
          imageAlt:
            'Model wearing minimalist watch with black wristband and white watch face.',
        },
      ],
    },
  ],
  pages: [
    { name: 'New In', href: '/collections/new-in' },
    { name: 'Value Buy', href: '/collections/value-buy' },
  ],
}
const collections = [
  {
    name: 'Handcrafted Collection',
    href: '#',
    imageSrc:
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-01-collection-01.jpg',
    imageAlt:
      'Brown leather key ring with brass metal loops and rivets on wood table.',
    description:
      'Keep your phone, keys, and wallet together, so you can lose everything at once.',
  },
  {
    name: 'Organized Desk Collection',
    href: '#',
    imageSrc:
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-01-collection-02.jpg',
    imageAlt:
      'Natural leather mouse pad on white desk next to porcelain mug and keyboard.',
    description:
      'The rest of the house will still be a mess, but your desk will look great.',
  },
  {
    name: 'Focus Collection',
    href: '#',
    imageSrc:
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-01-collection-03.jpg',
    imageAlt:
      'Person placing task list card into walnut card holder next to felt carrying case on leather desk pad.',
    description:
      'Be more productive than enterprise project managers with a single piece of paper.',
  },
]

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [categories, setCategories] = useState<Tables<'categories'>[] | null>(
    null
  )

  useEffect(() => {
    const fetchCategories = async () => {
      const supabase = await createClient()
      const { data, error } = await supabase.from('categories').select('*')

      if (error) {
        console.error('Error fetching categories: ', error)
        return
      }

      if (data) {
        setCategories(data)
      }
    }

    fetchCategories()
  }, [])

  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="relative z-40 lg:hidden"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
        />

        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-closed:-translate-x-full"
          >
            <div className="flex px-4 pt-5 pb-2">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>

            {/* Links */}
            <TabGroup className="mt-2">
              <div className="border-b border-gray-200">
                <TabList className="-mb-px flex space-x-8 px-4">
                  {navigation.categories.map((category) => (
                    <Tab
                      key={category.name}
                      className="flex-1 border-b-2 border-transparent px-1 py-4 text-base font-medium whitespace-nowrap text-gray-900 data-selected:border-indigo-600 data-selected:text-indigo-600"
                    >
                      {category.name}
                    </Tab>
                  ))}
                </TabList>
              </div>
              <TabPanels as={Fragment}>
                {navigation.categories.map((category) => (
                  <TabPanel
                    key={category.name}
                    className="space-y-12 px-4 py-6"
                  >
                    <div className="grid grid-cols-2 gap-x-4 gap-y-10">
                      {category.featured.map((item) => (
                        <div key={item.name} className="group relative">
                          <img
                            alt={item.imageAlt}
                            src={item.imageSrc}
                            className="aspect-square w-full rounded-md bg-gray-100 object-cover group-hover:opacity-75"
                          />
                          <a
                            href={item.href}
                            className="mt-6 block text-sm font-medium text-gray-900"
                          >
                            <span
                              aria-hidden="true"
                              className="absolute inset-0 z-10"
                            />
                            {item.name}
                          </a>
                          <p
                            aria-hidden="true"
                            className="mt-1 text-sm text-gray-500"
                          >
                            Shop now
                          </p>
                        </div>
                      ))}
                    </div>
                  </TabPanel>
                ))}
              </TabPanels>
            </TabGroup>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              {navigation.pages.map((page) => (
                <div key={page.name} className="flow-root">
                  <a
                    href={page.href}
                    className="-m-2 block p-2 font-medium text-gray-900"
                  >
                    {page.name}
                  </a>
                </div>
              ))}
            </div>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              <div className="flow-root">
                <a
                  href="#"
                  className="-m-2 block p-2 font-medium text-gray-900"
                >
                  Create an account
                </a>
              </div>
              <div className="flow-root">
                <a
                  href="#"
                  className="-m-2 block p-2 font-medium text-gray-900"
                >
                  Sign in
                </a>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Hero section */}
      <div className="relative bg-gray-900">
        {/* Decorative image and overlay */}
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
          <img
            alt=""
            src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-01-hero-full-width.jpg"
            className="size-full object-cover"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gray-900 opacity-50"
        />

        <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-32 text-center sm:py-64 lg:px-0">
          <h1 className="text-4xl font-bold tracking-tight text-white lg:text-6xl">
            New arrivals are here
          </h1>
          <p className="mt-4 text-xl text-white">
            The new arrivals have, well, newly arrived. Check out the latest
            options from our summer small-batch release while they're still in
            stock.
          </p>
          <a
            href="#"
            className="mt-8 inline-block rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100"
          >
            Shop New Arrivals
          </a>
        </div>
      </div>

      <main>
        {/* Category section */}
        {categories && categories.length > 0 && (
          <section
            aria-labelledby="category-heading"
            className="pt-24 sm:pt-32 xl:mx-auto xl:max-w-7xl xl:px-8"
          >
            <div className="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0">
              <h2
                id="category-heading"
                className="text-2xl font-bold tracking-tight text-gray-900"
              >
                Shop by Category
              </h2>
              <a
                href="#"
                className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block"
              >
                Browse all categories
                <span aria-hidden="true"> &rarr;</span>
              </a>
            </div>

            <div className="mt-4 flow-root">
              <div className="-my-2">
                <div className="relative box-content overflow-x-auto py-2 xl:overflow-visible">
                  <div className="gap-8 px-4 sm:px-6 lg:px-8 relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-8 xl:space-x-0 xl:px-0">
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/categories/${category.slug}`}
                        className="relative flex h-80 flex-col overflow-hidden rounded-lg p-6 hover:opacity-75 xl:w-auto"
                      >
                        <span aria-hidden="true" className="absolute inset-0">
                          <img
                            alt=""
                            src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-01-category-05.jpg"
                            className="size-full object-cover"
                          />
                        </span>
                        <span
                          aria-hidden="true"
                          className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 to-transparent opacity-50"
                        />
                        <span className="relative mt-auto text-center text-xl font-bold text-white">
                          {category.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 px-4 sm:hidden">
              <a
                href="#"
                className="block text-sm font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Browse all categories
                <span aria-hidden="true"> &rarr;</span>
              </a>
            </div>
          </section>
        )}

        {/* Collection section */}
        <section
          aria-labelledby="collection-heading"
          className="mx-auto max-w-xl px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8"
        >
          <h2
            id="collection-heading"
            className="text-2xl font-bold tracking-tight text-gray-900"
          >
            Shop by Collection
          </h2>
          <p className="mt-4 text-base text-gray-500">
            Each season, we collaborate with world-class designers to create a
            collection inspired by the natural world.
          </p>

          <div className="mt-10 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-y-0">
            {collections.map((collection) => (
              <a
                key={collection.name}
                href={collection.href}
                className="group block"
              >
                <img
                  alt={collection.imageAlt}
                  src={collection.imageSrc}
                  className="aspect-3/2 w-full rounded-lg object-cover group-hover:opacity-75 lg:aspect-5/6"
                />
                <h3 className="mt-4 text-base font-semibold text-gray-900">
                  {collection.name}
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  {collection.description}
                </p>
              </a>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
