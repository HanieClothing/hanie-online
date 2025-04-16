import CategoriesSection from './components/CategoriesSection'
import CollectionsSection from './components/CollectionsSection'
import HeroSection from './components/HeroSection'

export default function Store() {
  return (
    <div className="bg-white">
      <HeroSection />

      <main>
        <CategoriesSection />

        <CollectionsSection />
      </main>
    </div>
  )
}
