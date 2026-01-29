import { Headset, RefreshCcw, ShieldCheck, Truck } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

// Features data used to render feature cards

const featuresCards = [
  {
    icon: <Truck size={40} strokeWidth={1.46} />,
    key:'freeDelivery'
  },
  {
    icon: <RefreshCcw size={40} strokeWidth={1.46} />,
    key: "getRefund"
  },
  {
    icon: <ShieldCheck size={40} strokeWidth={1.46} />,
    key: "safePayment"
  },
  {
    icon: <Headset size={40} strokeWidth={1.46} />,
    key: "support"
  },
] as const;
export default function FeaturesSection() {
    //translation
    const t = useTranslations("features");
  return (
    // Main features section

    <section className="py-10 px-20 w-full">
      <div className=" bg-maroon-50 dark:bg-zinc-700 flex items-center gap-4 rounded-2xl">
        {/* Render each feature card */}

        {featuresCards.map((card) => {
          return (
            <div
              key={card.key}
              className="p-10 flex-1 flex items-center gap-4"
            >
              <div className="flex-shrink-0 w-16 h-16 bg-maroon-600 dark:bg-softPink-200 text-white dark:text-zinc-800 rounded-full flex items-center justify-center">
                {card.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-maroon-600 dark:text-softPink-200">
                 {t(`${card.key}.title`)}
                </h3>
                <p className="text-sm font-normal text-zinc-500 dark:text-zink-300">
                  {t(`${card.key}.description`)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
