'use client'

import Link from 'next/link'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Skeleton } from '@/components/ui/skeleton'
import { useCategoriesQuery } from '@/hooks/categories'

const CategoriesSection = () => {
  const { data: categories, isLoading, isError } = useCategoriesQuery()

  return (
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
          {isLoading &&
            Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem
                key={index}
                className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
              >
                <Skeleton className="h-80 rounded-lg" />
              </CarouselItem>
            ))}

          {!isLoading &&
            !isError &&
            categories &&
            categories.map((category) => (
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
  )
}

export default CategoriesSection
