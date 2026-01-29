import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";
export default function Occasions() {
  //translation
  const t = useTranslations("occasions");

  // Configuration array that defines the content of each occasion card.
  const occasionCards = [
    {
      src: "/assets/images/home/wedding-photo.png",
      key: "wedding",
      alt: "Wedding occassion",
    },
    {
      src: "/assets/images/home/engagement-photo.png",
      key: "engagement",
      alt: "Engagement occassion",
    },
    {
      src: "/assets/images/home/anniversary-photo.png",
      key: "anniversary",
      alt: "Anniversary occassion",
    },
  ] as const;

  return (
    // Main container that holds all occasion cards

    <section className="flex  px-20  pt-6 gap-6 w-full">
      {occasionCards.map((card) => {
        return (
          <Link
            key={card.key}
            href={`/products?occasion=${card.key}`}
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
              <Badge variant="warning" className="capitalize">
                {t(`${card.key}.badge`)}
              </Badge>
              <p className="font-semibold text-2xl  text-white w-[362px] h-12">
                {t(`${card.key}.text`)}
              </p>
            </div>
          </Link>
        );
      })}
    </section>
  );
}
