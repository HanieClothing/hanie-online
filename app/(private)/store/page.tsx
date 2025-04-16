import CategoriesSection from './components/CategoriesSection'
import CollectionsSection from './components/CollectionsSection'
import HeroSection from './components/HeroSection'
import IncentivesSection from './components/IncentivesSection'

export default function Store() {
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
