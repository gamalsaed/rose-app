'use client';

import ProductCard from '@/components/features/product-card';
import { ProductAPI } from '@/lib/services/products';
import { useTranslations } from 'next-intl';

interface Props {
  products: ProductAPI[];
}

export default function OccasionFilterSection({ products }: Props) {
  const t = useTranslations();

  return (
    <section className=" h-full py-16">
      <div className=" flex flex-wrap gap-2 ">
        {products.map(product => (
          <div key={product._id}>
            <ProductCard
              {...product}
              id={product._id}
              title={product.title}
              price={product.price}
              priceAfterDiscount={product.priceAfterDiscount}
              imageCover={product.imgCover}
              ratingsAverage={product.rateAvg}
              quantity={product.quantity}
              sold={product.sold}
              createdAt={product.createdAt}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
