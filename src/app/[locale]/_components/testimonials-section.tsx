import { getTranslations } from "next-intl/server";
import { getTestimonials } from "@/lib/apis/testimonials";

import SectionTitle from "@/components/features/home/title-section";
import { TestimonialsCarousel } from "@/app/[locale]/_components/testimonials-carousel";

export async function TestimonialsSection() {
  // Translation
  const t = await getTranslations();

  // Queries
  const data = await getTestimonials();

  return (
    <section className="flex flex-col items-center">
      {/* Testimonials Title */}
      <SectionTitle
        label={t("homepage.testimonials-title")}
        title={t("homepage.testimonials-subtitle")}
        className="mx-auto mb-10"
        component="p"
      />

      {/* Testimonials Carousel */}
      <section className="w-full flex justify-center pt-28 px-16 pb-32 bg-maroon-50 dark:bg-zinc-700">
        <TestimonialsCarousel testimonials={data.testimonials} />
      </section>
    </section>
  );
}
