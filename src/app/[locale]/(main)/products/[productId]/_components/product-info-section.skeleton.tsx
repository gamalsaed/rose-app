import { ProductGallerySkeleton } from './product-gallery.skeleton';
import { ProductInfoSkeleton } from './product-info.skeleton';

export const ProductInfoSectionSkeleton = () => {
  return (
    <div className="h-[calc((100vw-224px)/2*0.85)] grid grid-cols-1 md:grid-cols-2 gap-x-16">
      <ProductGallerySkeleton />

      <ProductInfoSkeleton />
    </div>
  );
};
