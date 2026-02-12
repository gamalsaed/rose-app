import { getProductDetails } from '@/lib/services/products';

import { ProductGallery } from './product-gallery';
import { ProductInfo } from './product-info';

type ProductInfoSectionProps = {
  productId: string;
};

export async function ProductInfoSection({
  productId,
}: ProductInfoSectionProps) {
  // server-side data fetching
  const data = await getProductDetails(productId);
  const product = data?.product;

  return (
    <section className="h-[calc((100vw-224px)/2*0.85)] grid grid-cols-1 md:grid-cols-2 gap-x-16">
      {/* Product Gallery */}
      <ProductGallery
        images={product?.images || []}
        title={product?.title || ''}
      />

      {/* Product Data */}
      <ProductInfo product={product!} />
    </section>
  );
}
