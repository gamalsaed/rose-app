"use client";

import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import type { CarouselApi } from "@/components/ui/carousel";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utilits/cn";

// Carousel slides data
const heroImages = [
  {
    id: "slide-1",
    src: "/assets/images/home/slide1.png",
    alt: "Flowers and chocolates",
  },
  {
    id: "slide-2",
    src: "/assets/images/home/slide2.png",
    alt: "Flowers and chocolates",
  },
  {
    id: "slide-3",
    src: "/assets/images/home/slide3.png",
    alt: "Special Gifts",
  },
  {
    id: "slide-4",
    src: "/assets/images/home/slide4.png",
    alt: "Gifts ideas for occasions",
  },
];
export function HeroCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);

    //Keyboard Navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") api.canScrollNext();
      if (e.key === "ArrowLeft") api.canScrollPrev();
    };
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup
    return () => {
      api.off("select", onSelect);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [api]);

  return (
    <div className="w-full">
      <Carousel setApi={setApi} className="rounded-2xl w-full overflow-hidden">
        <CarouselContent>
          {heroImages.map((img) => (
            <CarouselItem
              key={img.id}
              className="relative rounded-2xl w-full overflow-hidden pl-0"
            >
              <Image
                src={img.src}
                width={956}
                height={440}
                alt={img.alt}
                className="w-full h-[470px] object-cover"
              />
              {/*carousel layer*/}
              <div className="absolute inset-0 z-10 bg-gradient-to-r  from-black/80 to-transparent"></div>
              <div className="left-9 bottom-9 absolute z-10">
                <p className="font-semibold text-3xl mt-3 text-white w-72 h-9">
                  Say It with Flowers
                </p>
                <p className="text-white font-normal  text-base h-12">
                  Elegant gifts for every special moment.
                </p>
                <Link href="/products">
                  <Button variant="secondary" >
                    I’m buying!
                  </Button>
                </Link>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/*carousel next and previous button */}
        <div className="flex justify-between absolute bottom-8 right-8 z-10 bg-maroon-50  rounded-full shadow-md">
          <button onClick={() => api?.scrollPrev()}>
            <span className="sr-only">Previous slide</span>
            <ChevronLeft
              aria-hidden="true"
              className={cn(
                "size-[30px]",
                api?.canScrollPrev()
                  ? "text-maroon-700 cursor-pointer"
                  : "text-zinc-400 cursor-not-allowed"
              )}
            />
          </button>

          <button onClick={() => api?.scrollNext()}>
            <span className="sr-only">Next slide</span>

            <ChevronRight
              className={cn(
                "size-[30px]",
                api?.canScrollNext()
                  ? "text-maroon-700 cursor-pointer"
                  : "text-zinc-400 cursor-not-allowed"
              )}
            />
          </button>
        </div>
        {/*carousel pagination */}
        <div className="absolute top-6 right-6 z-10 flex gap-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "h-2.5 rounded-[2.9125rem] transition-all duration-300",
                current === index ? "bg-maroon-600 w-9" : "bg-maroon-50 w-2.5"
              )}
            ></button>
          ))}
        </div>
      </Carousel>
    </div>
  );
}
