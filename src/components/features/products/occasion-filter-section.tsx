'use client';

import ProductCard from '@/components/features/product-card';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { ProductAPI } from '@/lib/services/products';
import { useTranslations } from 'next-intl';

interface Props {
  products: ProductAPI[];
}

export default function OccasionFilterSection({ products }: Props) {
  const t = useTranslations();

  return (
    <section className="mx-auto pt-16">
      <div className=" flex gap-2 ">
        {products.map(product => (
          <ProductCard
            key={product._id}
            {...product}
            title={product.title}
            price={product.price}
            priceAfterDiscount={product.priceAfterDiscount}
            imageCover={product.imgCover}
            ratingsAverage={product.rateAvg}
            quantity={product.quantity}
            sold={product.sold}
            createdAt={product.createdAt}
          />
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        <Link href="/products">
          <span className="flex items-center gap-2 text-maroon-700 font-semibold">
            {t('most-popular.view-all')}
            <ArrowRight size={18} />
          </span>
        </Link>
      </div>
    </section>
  );
}
