"use client";

import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import { TestimonialCard } from "./testimonial-card";
import { Testimonial } from "@/lib/types/testimonials";

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
}

export const TestimonialsCarousel = ({
  testimonials,
}: TestimonialsCarouselProps) => {
  return (
    <Carousel
      className="mx-auto overflow-visible max-w-full"
      opts={{
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 3000,
          stopOnInteraction: false,
        }),
      ]}
    >
      <CarouselContent className="mx-auto">
        {testimonials.map((testimonial, index) => (
          <CarouselItem key={index} className={`ps-0 basis-1/3`}>
            <TestimonialCard
              name={`${testimonial.user.firstName} ${testimonial.user.lastName}`}
              quote={testimonial.content}
              date={testimonial.createdAt}
              rating={testimonial.rating}
              avatarUrl={testimonial.user.photo}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
