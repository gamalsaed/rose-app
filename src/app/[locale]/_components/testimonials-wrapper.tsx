import { getTestimonials } from "@/lib/apis/testimonials";

import { TestimonialsCarousel } from "@/app/[locale]/_components/testimonials-carousel";

// * fetch testimonials on server side
export async function TestimonialsWrapper() {
  // Queries
  const data = await getTestimonials();

  return <TestimonialsCarousel testimonials={data.testimonials} />;
}
