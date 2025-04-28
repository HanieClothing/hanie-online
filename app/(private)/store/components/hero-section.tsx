'use client'
import Autoplay from 'embla-carousel-autoplay'
import Link from 'next/link'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { useCollectionsQuery } from '@/hooks/collections'

const HeroSection = () => {
  const { data: collections } = useCollectionsQuery()

  return (
    <div className="relative bg-gray-900">
      <Carousel
        className="w-full"
        opts={{
          loop: true,
          slidesToScroll: 1,
        }}
        plugins={[Autoplay({
          stopOnMouseEnter: true,
          stopOnInteraction: false
        })]}
      >
        <CarouselContent>
          {collections?.map((collection) => (
            <CarouselItem key={collection.id} className="relative">
              {collection.image_url && (
                <div
                  aria-hidden="true"
                  className="absolute inset-0 overflow-hidden"
                >
                  <img
                    alt={`${collection?.name} collection banner image`}
                    src={collection.image_url}
                    className="size-full object-cover"
                  />
                </div>
              )}

              <div
                aria-hidden="true"
                className="absolute inset-0 bg-black/50"
              />

              <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-12 text-center sm:py-64 lg:px-0">
                <h1 className="text-2xl font-bold tracking-tight text-white lg:text-6xl">
                  {collection?.name}
                </h1>
                <p className="mt-2 lg:mt-4 text-sm lg:text-xl text-white">
                  {collection?.description}
                </p>
                <Link
                  href={`/collections/${collection?.slug}`}
                  className="mt-4 lg:mt-8 inline-block rounded-md border border-transparent bg-white py-1 px-4 lg:px-8 lg:py-3 text-sm lg:text-base font-medium text-gray-900 hover:bg-gray-100"
                >
                  Shop Now
                </Link>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}

export default HeroSection
