"use client";

import * as React from "react";
import AutoScroll from "embla-carousel-auto-scroll";
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

export function TestimonialsCarousel({
  testimonials,
}: TestimonialsCarouselProps) {
  // Ref
  const plugin = React.useRef(
    AutoScroll({
      speed: 1,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  return (
    <Carousel
      className="mx-auto overflow-visible max-w-full"
      opts={{
        loop: true,
        align: "start", // allow freestyle / free-scrolling
        dragFree: true, // enable smooth/free slide movement
      }}
      plugins={[plugin.current]}
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
}
