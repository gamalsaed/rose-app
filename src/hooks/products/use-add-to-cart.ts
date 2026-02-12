import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { Product, CartProduct, AddToCartPayload } from '@/lib/types/products';
import { addToCart } from '@/lib/actions/products.actions';

export function useAddToCart() {
  const { data: session } = useSession();
  const isLoggedIn = !!session?.user;

  const { mutateAsync, isPending, error, isError } = useMutation({
    mutationFn: async (payload: AddToCartPayload) => {
      const response = await addToCart(payload);
      return response;
    },
  });

  const handleAddToCart = async (product: Product, quantity: number = 1) => {
    if (!isLoggedIn) {
      const localCartItems = localStorage.getItem('cart-items');

      const cartItems = JSON.parse(localCartItems || '[]') as CartProduct[];
      let alreadyInCart = false;

      // update quantity if product already in cart
      cartItems.forEach((currItem, index) => {
        const existingItem = currItem._id === product._id;

        if (existingItem) {
          cartItems[index].quantity += quantity;
        } else {
          alreadyInCart = true;
        }
      });

      // add product to cart if not already in cart
      if (!alreadyInCart) {
        cartItems.push({
          product,
          price: product.priceAfterDiscount * quantity,
          quantity,
          _id: product._id,
        });
      }

      localStorage.setItem('cart-items', JSON.stringify(cartItems));

      return;
    }

    await mutateAsync({ productId: product._id, quantity });
  };

  return { addToCart: handleAddToCart, isPending, error, isError };
}
