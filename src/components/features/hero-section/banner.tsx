import React from "react";
import { HeroCarousel } from "./hero-carousal";
import GiftCard from "./gift-card";

export default function Banner() {
  return (
    // Main banner section container
    <section className="grid pt-11 px-20  grid-cols-4 gap-8 ">
          {/* Left side: Static hero image with overlay content */}

      <div className="lg:col-span-1">
        <GiftCard/>
      </div>
      {/* Right side: Hero carousel */}

    <div className="lg:col-span-3">
        <HeroCarousel />
      </div>
    </section>
  );
}
