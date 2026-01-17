import React from "react";
import Image from "next/image";
import CustomBadge from "@/components/shared/custom-badge";
import Link from "next/link";

export default function Occasions() {
  // Configuration array that defines the content of each occasion card.
  const occasionCards = [
    {
      src: "/assets/images/home/wedding-photo.png",
      badge: "Wedding",
      text: "Celebrate Her Forever with a Gift She’ll Always Remember",
      alt: "Wedding occassion",
    },
    {
      src:"/assets/images/home/engagement-photo.png",
      badge: "Engagement",
      text: "Honor the Beginning of a Beautiful Journey Together",
      alt: "Engagement occassion",
    },
    {
      src: "/assets/images/home/anniversary-photo.png",
      badge: "Anniversary",
      text: "Mark Every Year of Love with a Meaningful Surprise",
      alt: "Anniversary occassion",
    },
  ];

  return (
    // Main container that holds all occasion cards

    <section className="flex  px-20  pt-6 gap-6 w-full">
      {occasionCards.map((card) => {
        return (
          <Link 
            key={card.badge}
            href={`/products?occasion=${card.badge.toLowerCase()}`}
            className="relative flex-1 rounded-2xl overflow-hidden p-6 w-[410px] h-[271px]"
          >
            {/* Background image that fully covers the card */}

            <Image
              src={card.src}
              fill
              alt={card.alt}
              className="object-cover w-full"
            />
            {/* Gradient overlay  */}

            <div className="absolute inset-0 z-10 bg-gradient-to-r  from-black/50 to-transparent"></div>
            
            {/* Occasion description text */}

            <div className="left-6 bottom-6 absolute z-20">
              <CustomBadge>{card.badge}</CustomBadge>
              <p className="font-semibold text-2xl  text-white w-[362px] h-12">
                {card.text}
              </p>
            </div>
          </Link>
        );
      })}
    </section>
  );
}
