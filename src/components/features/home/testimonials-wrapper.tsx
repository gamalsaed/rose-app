import { getTestimonials } from "@/lib/apis/testimonials";

import { TestimonialsCarousel } from "@/components/features/home/testimonials-carousel";

// * fetch testimonials on server side
export async function TestimonialsWrapper() {
  // Queries
  const data = await getTestimonials();

  return <TestimonialsCarousel testimonials={data.testimonials} />;
}
