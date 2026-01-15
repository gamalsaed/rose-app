import { getTranslations } from "next-intl/server";
import { getTestimonials } from "@/lib/apis/testimonials";

import { SectionTitle } from "@/components/shared/section-title";
import { TestimonialsCarousel } from "@/app/[locale]/_components/testimonials-carousel";

export async function TestimonialsSection() {
  // Translation
  const t = await getTranslations();

  // Queries
  const data = await getTestimonials();

  return (
    <section className="flex flex-col items-center">
      {/* Testimonials Title */}
      <h2 className="uppercase font-sarabun tracking-[0.25em] font-bold text-softPink-500 dark:text-maroon-400 mb-2">
        {t("homepage.testimonials-title")}
      </h2>

      {/* Testimonials Subtitle */}
      <SectionTitle
        title={t("homepage.testimonials-subtitle")}
        className="mx-auto mb-10"
        as="p"
      />

      {/* Testimonials Carousel */}
      <section className="w-full flex justify-center pt-28 px-14 pb-32 bg-maroon-50 dark:bg-zinc-700">
        <TestimonialsCarousel testimonials={data.testimonials} />
      </section>
    </section>
  );
}
