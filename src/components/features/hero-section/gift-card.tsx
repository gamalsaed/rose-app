import CustomBadge from '@/components/shared/custom-badge'
import CustomButton from '@/components/shared/custom-button'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

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
          <CustomBadge>Staring from 10.99 EGP</CustomBadge>
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
    </>
  )
}
