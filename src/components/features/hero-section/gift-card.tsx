import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import React from "react";
import { Button } from "@/components/ui/button";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utilits/cn";
export default function GiftCard() {
   //translation
    const t = useTranslations('banner');
    const locale = useLocale();
    const isRTL = locale === "ar";
  return (
    <>
      <div className="rounded-xl  relative overflow-hidden">
        {/* Hero image */}

        <Image
          src="/assets/images/home/gift.png"
          width={301}
          height={470}
          alt="Special gifts"
          className="w-full rounded-xl h-[470px] object-cover"
        />
        {/* Overlay content on top of the image */}

        <div className="left-6 top-64 absolute">
          <Badge variant="warning" className="capitalize">{t('badge')}</Badge>
          <p className="font-semibold text-2xl mt-3 text-white w-64 h-20">
            {t('special-gifts')}
          </p>
          <Link href="/products">
            <Button variant="secondary" className="px-4 py-2 mt-2 h-9 w-[8.125rem] capitalize">
              {t('shop-now')} <ArrowRight className={cn(isRTL && "rotate-180")} aria-hidden="true" />
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
