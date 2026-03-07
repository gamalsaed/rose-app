'use client';

import { useEffect, useState } from 'react';
import ProductCard from '@/components/features/product-card';
import AddToWhishlist from './add-to-whishlist';
import { useAddToWishlist } from '../_hooks/use-add-to-whislist';
import { useQueryClient } from '@tanstack/react-query';

type Props = {
  products: Product[];
  userIsLoggedIn: boolean;
};

export default function ProductItem({ products, userIsLoggedIn }: Props) {
  // State
  const [guestWishlist, setGuestWishlist] = useState<string[]>([]);
  const [isInitializing, setIsInitializing] = useState(true);

  // Queries / Mutations
  const {
    mutateAsync: toggleWishlist,
    isPending,
    variables,
  } = useAddToWishlist();

  // Effects
  useEffect(() => {
    if (!userIsLoggedIn) {
      const stored = localStorage.getItem('wishlist');
      if (stored) setGuestWishlist(JSON.parse(stored));
      setIsInitializing(false); // guests ready immediately
    }
  }, [userIsLoggedIn]);

  // Functions
  const handleWishlist = async (productId: string) => {
    if (isPending) return;

    if (!userIsLoggedIn) {
      setGuestWishlist(prev => {
        const isAlready = prev.includes(productId);
        const newWishlist = isAlready
          ? prev.filter(id => id !== productId)
          : [...prev, productId];
        localStorage.setItem('wishlist', JSON.stringify(newWishlist));
        return newWishlist;
      });
      return;
    }

    // Optimistic update for logged-in user
    const productIndex = products.findIndex(p => p._id === productId);
    if (productIndex !== -1) {
      products[productIndex].isInWishlist =
        !products[productIndex].isInWishlist;
    }

    await toggleWishlist({ productId, isAuth: true });
  };

  return (
    <div className="grid grid-cols-3 gap-4 mt-20">
      {products.map(p => {
        const isPendingForThisProduct =
          isPending && variables?.productId === p._id;

        // Determine wishlist state for icon
        const isActive = userIsLoggedIn
          ? p.isInWishlist
          : guestWishlist.includes(p._id);

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
              // disable button if mutation is pending or still initializing
              disabled={
                isPendingForThisProduct || (!userIsLoggedIn && isInitializing)
              }
            />
          </div>
        );
      })}
    </div>
  );
}
