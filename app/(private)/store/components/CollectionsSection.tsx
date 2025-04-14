'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { useCollectionsQuery } from '@/hooks/collections'

function CollectionsSection() {
  const { data: collections, isLoading, isError } = useCollectionsQuery()

  return (
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
        {isLoading &&
          Array.from({ length: 3 }).map((_, index) => (
            <div key={index}>
              <Skeleton className="w-full h-96 aspect-3/2 rounded-lg lg:aspect-5/6" />
              <Skeleton className="mt-4 w-1/3 h-4" />
              <Skeleton className="mt-2 w-2/3 h-4" />
            </div>
          ))}

        {!isLoading &&
          !isError &&
          collections &&
          collections.map((collection) => (
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
  )
}

export default CollectionsSection
