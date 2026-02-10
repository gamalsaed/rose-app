'use client';

import ProductCard from '@/components/features/product-card';
import AddToWhishlist from './add-to-whishlist';
import { useWishlist } from '../_hooks/use-add-to-whislist';

type Props = {
  products: ProductsResponse['products'];
};

// Renders a grid of products with add/remove wishlist buttons

export default function ProductItem({ products }: Props) {
  const { toggleWishlist, mutation, data } = useWishlist();

  const whishlistProducts =
    (data && 'data' in data && data.data.wishlist.products) || [];

  const handleWishlist = (productId: string) => {
    console.log('clicked:', productId);
    const productIsActive = whishlistProducts.some(
      item => item._id === productId
    );
    toggleWishlist({ productId, isActive: productIsActive });
  };

  return (
    <div className="grid grid-cols-3 gap-4 mt-20">
      {products.map(p => {
        const isActive = whishlistProducts.some(item => item._id === p._id);
        const isPendingForThisProduct =
          mutation.isPending && mutation.variables?.productId === p._id;
        return (
          <div key={p._id} className="relative">
            <ProductCard
              createdAt={p.createdAt}
              title={p.title}
              price={p.price}
              priceAfterDiscount={p.priceAfterDiscount}
              imageCover={p.imgCover}
              ratingsAverage={p.rateAvg}
              quantity={p.quantity}
              sold={p.sold}
            />
            <AddToWhishlist
              isActive={isActive}
              onClick={() => handleWishlist(p._id)}
              disabled={isPendingForThisProduct}
            />
          </div>
        );
      })}
    </div>
  );
}
