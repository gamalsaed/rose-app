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
import CustomButton from "@/components/shared/custom-button";
import slide1 from "/public/assets/images/hero-images/slide1.png";
import slide2 from "/public/assets/images/hero-images/slide2.png";
import slide3 from "/public/assets/images/hero-images/slide3.png";
import slide4 from "/public/assets/images/hero-images/slide4.png";


// Carousel slides data
const heroImages = [
  { src: slide1, alt: "Flowers and chocolates" },
  { src: slide2, alt: "Flowers and chocolates" },
  { src: slide3, alt: "Special Gifts" },
  { src: slide4, alt: "Gifts ideas for occasions" },
];

export function HeroCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

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
          {heroImages.map((img, index) => (
            <CarouselItem
              key={index}
              className="relative rounded-2xl w-full overflow-hidden pl-0"
            >
              <Image
                src={img.src}
                width={956}
                height={440}
                alt={img.alt}
                className="w-full h-[470px] object-cover"
              />
              {/***************************************carousel layer******************************************************* */}
              <div className="absolute inset-0 z-10 bg-gradient-to-r  from-black/80 to-transparent"></div>
              <div className="left-9 bottom-9 absolute z-10">
                <p className="font-semibold text-3xl mt-3 text-white w-72 h-9">
                  Say It with Flowers
                </p>
                <p className="text-white font-normal  text-base h-12">
                  Elegant gifts for every special moment.
                </p>
                <Link href="/products">
                  <CustomButton aria-label="Go to products">
                    I’m buying!
                  </CustomButton>
                </Link>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/***************************************carousel next and previous button******************************************************* */}
        <div className="flex justify-between absolute bottom-8 right-8 z-10 bg-maroon-50  rounded-full shadow-md">
          <button onClick={() => api?.scrollPrev()}>
            <span className="sr-only">Previous slide</span>
            <ChevronLeft
              aria-hidden="true"
              className={`size-[30px] ${
                api?.canScrollPrev()
                  ? " text-maroon-700 cursor-pointer"
                  : " text-zinc-400 cursor-not-allowed"
              }`}
            />
          </button>

          <button onClick={() => api?.scrollNext()}>
            <span className="sr-only">Next slide</span>

            <ChevronRight
              className={`size-[1.875rem] ${
                api?.canScrollNext()
                  ? " text-maroon-700 cursor-pointer"
                  : " text-zinc-400 cursor-not-allowed"
              }`}
            />
          </button>
        </div>
        {/***************************************carousel pagination*************************************************************** */}
        <div className="absolute top-6 right-6 z-10 flex gap-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => api?.scrollTo(index)}
              className={`h-2.5 rounded-[2.9125rem] transition-all duration-300 ${
                current === index ? "bg-maroon-600 w-9" : "bg-maroon-50 w-2.5"
              }`}
            ></button>
          ))}
        </div>
      </Carousel>
    </div>
  );
}
