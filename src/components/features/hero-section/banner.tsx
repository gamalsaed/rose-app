import CustomButton from "@/components/shared/custom-button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { HeroCarousel } from "./hero-carousal";
import CustomBadge from "@/components/shared/custom-badge";

export default function Banner() {
  return (
    // Main banner section container
    <section className="container px-20 pt-10  flex items-center gap-6">
      {/* Left side: Static hero image with overlay content */}

      <div className="rounded-xl flex-shrink-0 relative overflow-hidden">
        {/* Hero image */}

        <Image
          src="/assets/images/hero-images/gift.png"
          width={301}
          height={470}
          alt="Special gifts"
          className="w-full rounded-xl h-[470px] "
        />
        {/* Overlay content on top of the image */}

        <div className="left-6 top-64 absolute">
          <CustomBadge>Special Gifts For The People You Love</CustomBadge>
          <p className="font-semibold text-2xl mt-3 text-white w-64 h-20">
            Special Gifts For The People You Love
          </p>
          <Link href="/products">
            <CustomButton aria-label="Go to products">
              Shop Now <ArrowRight aria-hidden="true" />
            </CustomButton>
          </Link>
        </div>
      </div>

      {/* Right side: Hero carousel */}

      <HeroCarousel />
    </section>
  );
}
