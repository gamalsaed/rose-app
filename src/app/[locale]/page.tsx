import HeroWrapper from "@/components/features/hero-section/hero-wrapper";
import AboutSection from "@/components/features/home/about-section";
import GallerySection from "@/components/features/home/gallery-section";
import { TestimonialsSection } from "@/components/features/home/testimonials-section";
import CompaniesSection from "@/components/features/home/companies-section";

export default function Page() {
  return (
    <main>
      {/* Hero Section */}
      <HeroWrapper />

      {/* Benefits Section */}

      {/* Best Selling Section */}

      {/* Most Popular Section */}

      {/* About Section */}
      <AboutSection />

      {/* Gallery Section */}
      <GallerySection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Companies Section */}
      <CompaniesSection />

      {/* Footer */}
    </main>
  );
}
