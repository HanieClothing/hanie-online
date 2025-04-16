'use client'
import Autoplay from 'embla-carousel-autoplay'
import Link from 'next/link'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { useCollectionsQuery } from '@/hooks/collections'

function HeroSection() {
  const { data: collections } = useCollectionsQuery()

  return (
    <div className="relative bg-gray-900">
      <Carousel
        className="w-full"
        opts={{
          loop: true,
          slidesToScroll: 1,
        }}
        plugins={[Autoplay()]}
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
                    alt=""
                    src={collection.image_url}
                    className="size-full object-cover"
                  />
                </div>
              )}

              <div
                aria-hidden="true"
                className="absolute inset-0 bg-black/50"
              />

              <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-32 text-center sm:py-64 lg:px-0">
                <h1 className="text-4xl font-bold tracking-tight text-white lg:text-6xl">
                  {collection?.name}
                </h1>
                <p className="mt-4 text-xl text-white">
                  {collection?.description}
                </p>
                <Link
                  href={`/collections/${collection?.slug}`}
                  className="mt-8 inline-block rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100"
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
