'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utilits/cn';

import { useAddToCart } from '@/hooks/products/use-add-to-cart';
import { Product } from '@/lib/types/products';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import { Package, Star, HeartPlus } from 'lucide-react';

type ProductInfoProps = {
  product: Product;
};

export const ProductInfo = ({ product }: ProductInfoProps) => {
  // Translations
  const t = useTranslations();

  // Mutations
  const { addToCart, isPending } = useAddToCart();

  // Functions
  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  // Variables
  const isInStock = product?.quantity > 0;
  const isInWishList = product?.isInWishlist;

  return (
    <div className="flex flex-col overflow-hidden">
      {/* TITLE */}
      <h1 className="text-3xl font-semibold mb-2">{product?.title}</h1>

      <div className="flex items-center text-3xl font-bold">
        {/* Original Price */}
        <p className="line-through text-zinc-300 me-1.5"> {product?.price}</p>

        {/* Discounted Price */}
        <p className="me-3.5">
          {t('price-without-currency', { amount: product?.priceAfterDiscount })}{' '}
          <span className="text-xl font-medium">{t('currency')}</span>
        </p>

        {/* Remaining Stock */}
        <p
          className={cn(
            'flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full',
            isInStock ? 'bg-zinc-100' : 'bg-red-50 text-red-600'
          )}
        >
          <Package
            size={20}
            className={cn(isInStock ? 'text-zinc-500' : 'text-red-600')}
          />
          {isInStock
            ? `${product?.quantity} ${t('product-details.left-in-stock')}`
            : t('product-details.out-of-stock')}
        </p>
      </div>

      <Separator className="my-4" />

      {/* Rating */}
      <div className="flex items-center gap-1.5">
        <Star size={20} className="text-yellow-500 fill-yellow-500" />

        <p>
          {t('product-details.rating')}:{' '}
          <span className="font-medium">{product?.rateAvg}/5</span>{' '}
          <span className="font-medium text-blue-600">
            ({product?.rateCount} {t('product-details.ratings')})
          </span>
        </p>
      </div>
      <Separator className="my-4" />

      {/* Description */}
      <p className="flex-grow overflow-y-auto text-zinc-600 mb-4">
        {product?.description}
      </p>

      {/* Product Actions */}
      <div className="grid grid-cols-[auto_1fr] gap-x-2 mt-auto">
        {/* TODO: handle wish list logic */}
        {/* Add to Wishlist */}
        <Button
          variant="secondary"
          size="icon"
          className={cn(
            isInWishList
              ? 'bg-zinc-800 text-white hover:bg-zinc-900'
              : 'bg-zinc-100 text-zinc-800 hover:bg-zinc-200'
          )}
          aria-label={t('product-details.add-to-wishlist')}
        >
          <HeartPlus size={25} />
        </Button>

        {/* Add to Cart */}
        <Button
          onClick={handleAddToCart.bind(null, product)}
          className=""
          disabled={!isInStock}
          loading={isPending}
        >
          {t('product-details.add-to-cart')}
        </Button>
      </div>
    </div>
  );
};
