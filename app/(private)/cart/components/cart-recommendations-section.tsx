import ProductCard from '@/components/product-card'
import { useCartRecommendationsQuery } from '@/hooks/cart'

function CartRecommendationsSection() {
  const { data: cartRecommendations } = useCartRecommendationsQuery()

  if (!cartRecommendations || cartRecommendations.length <= 0) return undefined

  return (
    <section aria-labelledby="cart-recommendations" className="mt-16 sm:mt-24">
      <h2
        id="cart-recommendations"
        className="text-lg font-medium text-gray-900"
      >
        You may also like&hellip;
      </h2>

      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {cartRecommendations?.map((product) => (
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
  )
}

export default CartRecommendationsSection
