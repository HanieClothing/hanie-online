const incentives = [
  {
    name: 'Free Shipping',
    imageSrc:
      'https://tailwindcss.com/plus-assets/img/ecommerce/icons/icon-shipping-simple.svg',
    description:
      'Enjoy free shipping on all orders over a certain amount. The more you shop, the more you save on delivery!',
  },
  {
    name: '3-Day Free Returns',
    imageSrc:
      'https://tailwindcss.com/plus-assets/img/ecommerce/icons/icon-exchange-simple.svg',
    description:
      'Changed your mind? Return your item within 3 days and get store credits added back to your account—no questions asked.',
  },
  {
    name: 'Referral Rewards',
    imageSrc:
      'https://tailwindcss.com/plus-assets/img/ecommerce/icons/icon-warranty-simple.svg',
    description:
      'Invite your friends! Once they make their first purchase, you’ll earn store credits as a thank-you from us.',
  },
]

const IncentivesSection = () => {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl sm:px-2 lg:px-4 pt-24 sm:pt-32">
        <div className="mx-auto max-w-2xl px-4 lg:max-w-none">
          <div>
            <h2 className="text-4xl text-center font-bold tracking-tight text-gray-900">
              We built our business on customer service
            </h2>
          </div>
          <div className="mt-16 grid grid-cols-3 gap-x-8 gap-y-10">
            {incentives.map((incentive) => (
              <div key={incentive.name}>
                <div className="sm:shrink-0 flex items-center justify-center">
                  <img alt="" src={incentive.imageSrc} className="size-16" />
                </div>
                <div className="mt-6 text-center">
                  <h3 className="text-sm font-medium text-gray-900">
                    {incentive.name}
                  </h3>
                  <p className="hidden mt-2 text-sm text-gray-500 md:block">
                    {incentive.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <p className="text-center text-gray-500 text-sm">*With T&amp;C apply.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IncentivesSection
