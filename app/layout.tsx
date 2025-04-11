'use client'

import './globals.css';

import Link from 'next/link';
import { Fragment, useState } from 'react';

import { useCartSize } from '@/hooks/cart';
import { useCategories } from '@/hooks/categories';
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

const footerNavigation = {
  shop: [
    { name: 'Bags', href: '#' },
    { name: 'Tees', href: '#' },
    { name: 'Objects', href: '#' },
    { name: 'Home Goods', href: '#' },
    { name: 'Accessories', href: '#' },
  ],
  company: [
    { name: 'Who we are', href: '#' },
    { name: 'Sustainability', href: '#' },
    { name: 'Press', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Terms & Conditions', href: '#' },
    { name: 'Privacy', href: '#' },
  ],
  account: [
    { name: 'Manage Account', href: '#' },
    { name: 'Returns & Exchanges', href: '#' },
    { name: 'Redeem a Gift Card', href: '#' },
  ],
  connect: [
    { name: 'Contact Us', href: '#' },
    { name: 'Facebook', href: '#' },
    { name: 'Instagram', href: '#' },
    { name: 'Pinterest', href: '#' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { cartSize } = useCartSize()
  const { categories } = useCategories()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground">
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
                        {categories.map((category) => (
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
                                    {categories.map((category) => (
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
                              {cartSize}
                            </span>
                            <span className="sr-only">
                              items in cart, view bag
                            </span>
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

        {children}

        <footer aria-labelledby="footer-heading" className="bg-white">
          <h2 id="footer-heading" className="sr-only">
            Footer
          </h2>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="border-t border-gray-200 py-20">
              <div className="grid grid-cols-1 md:grid-flow-col md:auto-rows-min md:grid-cols-12 md:gap-x-8 md:gap-y-16">
                {/* Image section */}
                <div className="col-span-1 md:col-span-2 lg:col-start-1 lg:row-start-1">
                  <img
                    alt=""
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                    className="h-8 w-auto"
                  />
                </div>

                {/* Sitemap sections */}
                <div className="col-span-6 mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-8 md:col-start-3 md:row-start-1 md:mt-0 lg:col-span-6 lg:col-start-2">
                  <div className="grid grid-cols-1 gap-y-12 sm:col-span-2 sm:grid-cols-2 sm:gap-x-8">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        Products
                      </h3>
                      <ul role="list" className="mt-6 space-y-6">
                        {footerNavigation.shop.map((item) => (
                          <li key={item.name} className="text-sm">
                            <a
                              href={item.href}
                              className="text-gray-500 hover:text-gray-600"
                            >
                              {item.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        Company
                      </h3>
                      <ul role="list" className="mt-6 space-y-6">
                        {footerNavigation.company.map((item) => (
                          <li key={item.name} className="text-sm">
                            <a
                              href={item.href}
                              className="text-gray-500 hover:text-gray-600"
                            >
                              {item.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      Customer Service
                    </h3>
                    <ul role="list" className="mt-6 space-y-6">
                      {footerNavigation.account.map((item) => (
                        <li key={item.name} className="text-sm">
                          <a
                            href={item.href}
                            className="text-gray-500 hover:text-gray-600"
                          >
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Newsletter section */}
                <div className="mt-12 md:col-span-8 md:col-start-3 md:row-start-2 md:mt-0 lg:col-span-4 lg:col-start-9 lg:row-start-1">
                  <h3 className="text-sm font-medium text-gray-900">
                    Sign up for our newsletter
                  </h3>
                  <p className="mt-6 text-sm text-gray-500">
                    The latest deals and savings, sent to your inbox weekly.
                  </p>
                  <form className="mt-2 flex sm:max-w-md">
                    <input
                      id="email-address"
                      type="text"
                      required
                      autoComplete="email"
                      aria-label="Email address"
                      className="block w-full rounded-md bg-white px-4 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                    />
                    <div className="ml-4 shrink-0">
                      <button
                        type="submit"
                        className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Sign up
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 py-10 text-center">
              <p className="text-sm text-gray-500">
                &copy; 2025 Hanie Clothing, Inc. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
