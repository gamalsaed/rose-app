import { useTranslations } from "next-intl";
import { Suspense } from "react";

import SectionTitle from "@/components/features/home/title-section";
import { TestimonialsWrapper } from "./testimonials-wrapper";
import { TestimonialsSkeleton } from "@/components/skeletons/home/testimonials.skeleton";

export function TestimonialsSection() {
  // Translation
  const t = useTranslations();

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
        <Suspense fallback={<TestimonialsSkeleton />}>
          <TestimonialsWrapper />
        </Suspense>
      </section>
    </section>
  );
}
