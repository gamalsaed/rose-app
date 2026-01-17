import HeroWrapper from "@/components/features/hero-section/hero-wrapper";
import AboutSection from "@/components/features/home/about-section";
import CompaniesSection from "@/components/features/home/companies-section";
import GallerySection from "@/components/features/home/gallery-section";
import BestSellingSection from "@/components/features/home/best-selling-section";
import MostPopularSection from "@/components/features/home/most-poular-section";

import { getHomePageData } from "@/lib/services/products";

// Define Props Interface
interface HomeProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

// Home Page Component async function
export default async function Home({ searchParams }: HomeProps) {
  // Fetch data for the homepage
  const { bestSellers, popularProducts, occasions, selectedOccasionId } =
    await getHomePageData(searchParams);

  // Render the homepage with fetched data
  return (
    <main>
      {/*hero section*/}
      <HeroWrapper />
      {/* best selling section */}
      <BestSellingSection products={bestSellers} />

      {/* most popular section */}
      <MostPopularSection
        products={popularProducts}
        occasions={occasions}
        selectedOccasionId={selectedOccasionId}
      />
      {/* about section */}
      <AboutSection />
      {/* allery section */}
      <GallerySection />

      {/*companies section */}
      <CompaniesSection />
    </main>
  );
}
