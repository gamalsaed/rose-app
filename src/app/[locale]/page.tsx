import HeroWrapper from "@/components/features/hero-section/hero-wrapper";
import BestSellingSection from "@/components/features/home/best-selling-section";
import MostPopularSection from "@/components/features/home/most-poular-section";
import AboutSection from "@/components/features/home/about-section";
import GallerySection from "@/components/features/home/gallery-section";
import { TestimonialsSection } from "@/components/features/home/testimonials-section";
import CompaniesSection from "@/components/features/home/companies-section";
import PaginationTest from "@/components/shared/pagination-test";
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
      {/* test field */}

      <PaginationTest />

      {/* test end */}

      {/* Hero Section */}
      <HeroWrapper />

      {/* Best Selling Section */}
      <BestSellingSection products={bestSellers} />

      {/* Most Popular Section */}
      <MostPopularSection
        products={popularProducts}
        occasions={occasions}
        selectedOccasionId={selectedOccasionId}
      />

      {/* About Section */}
      <AboutSection />

      {/* Gallery Section */}
      <GallerySection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Companies Section */}
      <CompaniesSection />
    </main>
  );
}
