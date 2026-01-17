import HeroWrapper from "@/components/features/hero-section/hero-wrapper";
import AboutSection from "@/components/features/home/about-section";
import CompaniesSection from "@/components/features/home/companies-section";
import GallerySection from "@/components/features/home/gallery-section";
export default function Home() {
  return (
    <main>
      {/*hero section*/}
      <HeroWrapper />
      {/* about section */}
      <AboutSection />

      {/* allery section */}
      <GallerySection />

      {/*companies section */}
      <CompaniesSection />
    </main>
  );
}
