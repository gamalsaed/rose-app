import { Suspense } from 'react';
import { ProductInfoSection } from './_components/product-info-section';
import { ProductInfoSectionSkeleton } from './_components/product-info-section.skeleton';

type ProductDetailsPageProps = {
  params: {
    productId: string;
  };
};

export default function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { productId } = params;

  return (
    <div className="px-20 mt-16 mb-24">
      {/* Product Info Section */}
      <Suspense fallback={<ProductInfoSectionSkeleton />}>
        <ProductInfoSection productId={productId} />
      </Suspense>

      {/* Product Reviews Section */}

      {/* Related Products Section */}
    </div>
  );
}
