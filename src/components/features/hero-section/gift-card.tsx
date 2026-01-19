import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import React from "react";
import { Button } from "@/components/ui/button";
export default function GiftCard() {
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
          <Badge variant="warning">Staring from 10.99 EGP</Badge>
          <p className="font-semibold text-2xl mt-3 text-white w-64 h-20">
            Special Gifts For The People You Love
          </p>
          <Link href="/products">
            <Button variant="secondary">
              Shop Now <ArrowRight aria-hidden="true" />
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
