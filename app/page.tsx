'use client'
import Link from 'next/link'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { useCategoriesQuery } from '@/hooks/categories'
import { useCollectionsQuery } from '@/hooks/collections'

export default function Home() {
  const { data: categories } = useCategoriesQuery()
  const { data: collections } = useCollectionsQuery()

  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative bg-gray-900">
        {/* Decorative image and overlay */}
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
          <img alt="" src="/home-hero.jpg" className="size-full object-cover" />
        </div>
        <div aria-hidden="true" className="absolute inset-0 bg-black/50" />

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
            Shop Now
          </a>
        </div>
      </div>

      <main>
        {/* Categories section */}
        {categories && categories.length > 0 && (
          <section
            aria-labelledby="category-heading"
            className="pt-24 sm:pt-32 xl:mx-auto xl:max-w-7xl xl:px-8"
          >
            <Carousel
              className="px-4 sm:px-6 lg:px-8 xl:px-0"
              opts={{
                align: 'start',
                loop: true,
                slidesToScroll: 1,
              }}
            >
              <div className="flex justify-between">
                <h2
                  id="category-heading"
                  className="text-2xl font-bold tracking-tight text-gray-900"
                >
                  Shop by Category
                </h2>

                <div className="space-x-2 md:space-x-4">
                  <CarouselPrevious />
                  <CarouselNext />
                </div>
              </div>

              <CarouselContent className="mt-4">
                {categories.map((category) => (
                  <CarouselItem
                    key={category.id}
                    className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                  >
                    <Link
                      href={`/categories/${category.slug}`}
                      className="relative flex h-80 flex-col overflow-hidden rounded-lg p-6 hover:opacity-75 xl:w-auto"
                    >
                      <span aria-hidden="true" className="absolute inset-0">
                        <img
                          alt=""
                          src={
                            category.image_url ??
                            'https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-01-category-05.jpg'
                          }
                          className="size-full object-cover object-top"
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
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
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
            {collections?.map((collection) => (
              <a
                key={collection.name}
                href={`/collections/${collection.slug}`}
                className="group block"
              >
                <img
                  alt={collection.name}
                  src={collection.image_url ?? ''}
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
