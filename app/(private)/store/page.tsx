import CategoriesSection from './components/categories-section'
import CollectionsSection from './components/collections-section'
import HeroSection from './components/hero-section'
import IncentivesSection from './components/incentives-section'

const StorePage = () => {
  return (
    <div className="bg-white">
      <HeroSection />

      <main>
        <IncentivesSection />

        <CategoriesSection />

        <CollectionsSection />
      </main>
    </div>
  )
}

export default StorePage
