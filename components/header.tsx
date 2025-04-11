'use client'

import Link from 'next/link';
import { Fragment, useState } from 'react';

import { useCartStore } from '@/stores/cart';
import { useCategoryStore } from '@/stores/category';
import {
    Dialog, DialogBackdrop, DialogPanel, Popover, PopoverButton, PopoverGroup, PopoverPanel, Tab,
    TabGroup, TabList, TabPanel, TabPanels
} from '@headlessui/react';
import {
    Bars3Icon, ChatBubbleLeftRightIcon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon
} from '@heroicons/react/24/outline';

const pages = [
  { name: 'New Arrivals', href: '/collections/new-arrivals' },
  { name: 'Value Buys', href: '/collections/value-buys' },
]

function Header() {
  const { cartItems } = useCartStore()
  const { categories } = useCategoryStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div>
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
                  <Tab className="flex-1 border-b-2 border-transparent px-1 py-4 text-base font-medium whitespace-nowrap text-gray-900 data-selected:border-indigo-600 data-selected:text-indigo-600">
                    Shop All
                  </Tab>
                </TabList>
              </div>
              <TabPanels as={Fragment}>
                <TabPanel className="space-y-12 px-4 py-6">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-10">
                    {categories?.map((category) => (
                      <div key={category.id} className="group relative">
                        {category.image_url && (
                          <img
                            alt={category.name}
                            src={category.image_url}
                            className="aspect-square w-full rounded-md bg-gray-100 object-cover group-hover:opacity-75"
                          />
                        )}

                        <a
                          href={`/categories/${category.slug}`}
                          className="mt-6 block text-sm font-medium text-gray-900"
                        >
                          <span
                            aria-hidden="true"
                            className="absolute inset-0 z-10"
                          />
                          {category.name}
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
              </TabPanels>
            </TabGroup>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              {pages.map((page) => (
                <div key={page.name} className="flow-root">
                  <Link
                    href={page.href}
                    className="-m-2 block p-2 font-medium text-gray-900"
                  >
                    {page.name}
                  </Link>
                </div>
              ))}
            </div>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              <div className="flow-root">
                <Link
                  href="/sign-up"
                  className="-m-2 block p-2 font-medium text-gray-900"
                >
                  Create an account
                </Link>
              </div>
              <div className="flow-root">
                <Link
                  href="/sign-in"
                  className="-m-2 block p-2 font-medium text-gray-900"
                >
                  Sign in
                </Link>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <header className="relative">
        <nav aria-label="Top">
          <div className="bg-white shadow-xs">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                {/* Logo (lg+) */}
                <div className="hidden lg:flex lg:flex-1 lg:items-center">
                  <Link href="/">
                    <span className="uppercase text-black font-serif font-semibold text-2xl tracking-[0.1em]">
                      Hanie
                    </span>
                  </Link>
                </div>

                <div className="hidden h-full lg:flex">
                  {/* Flyout menus */}
                  <PopoverGroup className="inset-x-0 bottom-0 px-4">
                    <div className="flex h-full justify-center space-x-8">
                      <Popover className="flex">
                        <div className="relative flex">
                          <PopoverButton className="group relative flex items-center justify-center text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800 data-open:text-indigo-600">
                            Shop All
                            <span
                              aria-hidden="true"
                              className="absolute inset-x-0 -bottom-px z-30 h-0.5 transition duration-200 ease-out group-data-open:bg-indigo-600"
                            />
                          </PopoverButton>
                        </div>

                        <PopoverPanel
                          transition
                          className="absolute z-20 inset-x-0 top-full text-sm text-gray-500 transition data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                        >
                          {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                          <div
                            aria-hidden="true"
                            className="absolute inset-0 top-1/2 bg-white shadow"
                          />

                          <div className="relative bg-white">
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lh:px-8">
                              <div className="grid grid-cols-4 gap-x-8 gap-y-10 py-16">
                                {categories?.map((category) => (
                                  <div
                                    key={category.id}
                                    className="group relative"
                                  >
                                    {category.image_url && (
                                      <img
                                        alt={category.name}
                                        src={category.image_url}
                                        className="aspect-square w-full rounded-md bg-gray-100 object-cover group-hover:opacity-75"
                                      />
                                    )}
                                    <a
                                      href={`/categories/${category.slug}`}
                                      className="mt-4 block font-medium text-gray-900"
                                    >
                                      <span
                                        aria-hidden="true"
                                        className="absolute inset-0 z-10"
                                      />
                                      {category.name}
                                    </a>
                                    <p aria-hidden="true" className="mt-1">
                                      Shop now
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </PopoverPanel>
                      </Popover>

                      {pages.map((page) => (
                        <Link
                          key={page.name}
                          href={page.href}
                          className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                        >
                          {page.name}
                        </Link>
                      ))}
                    </div>
                  </PopoverGroup>
                </div>

                {/* Mobile menu and search (lg-) */}
                <div className="flex flex-1 items-center lg:hidden">
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(true)}
                    className="-ml-2 rounded-md bg-white p-2 text-gray-400"
                  >
                    <span className="sr-only">Open menu</span>
                    <Bars3Icon aria-hidden="true" className="size-6" />
                  </button>

                  {/* Search */}
                  <Link
                    href="/search"
                    className="ml-2 p-2 text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon
                      aria-hidden="true"
                      className="size-6"
                    />
                  </Link>
                </div>

                {/* Logo (lg-) */}
                <Link href="/" className="lg:hidden">
                  <span className="uppercase text-black font-serif font-semibold text-2xl tracking-[0.1em]">
                    Hanie
                  </span>
                </Link>

                <div className="flex flex-1 items-center justify-end">
                  <Link
                    href="/search"
                    className="hidden text-sm font-medium text-gray-400 hover:text-gray-500 lg:block"
                  >
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon
                      aria-hidden="true"
                      className="size-6"
                    />
                  </Link>

                  <div className="flex items-center lg:ml-8">
                    {/* Live Chat */}
                    <Link
                      href="/live-chat"
                      className="font-medium text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">Live Chat</span>
                      <ChatBubbleLeftRightIcon
                        aria-hidden="true"
                        className="size-6"
                      />
                    </Link>

                    {/* Cart */}
                    <div className="ml-4 flow-root lg:ml-8">
                      <Link
                        href="/cart"
                        className="group -m-2 flex items-center p-2"
                      >
                        <ShoppingBagIcon
                          aria-hidden="true"
                          className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
                        />
                        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                          {cartItems?.length ?? 0}
                        </span>
                        <span className="sr-only">items in cart, view bag</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}

export default Header
