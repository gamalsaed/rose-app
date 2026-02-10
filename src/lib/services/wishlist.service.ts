// Fetches the current user's wishlist from the API
export async function getWishlist() {
  const res = await fetch(`/api/wishlist`);
  const data: WishlistApiResponse = await res.json();
  return data;
}
// Adds a product to the user's wishlist
export async function addToWishlist(productId: string) {
  const res = await fetch(`/api/wishlist`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId }),
  });
  return res.json();
}
// Removes a product from the user's wishlist
export async function removeFromWishlist(productId: string) {
  const res = await fetch(`/api/wishlist?productId=${productId}`, {
    method: 'DELETE',
  });
  // Throw an error if deletion fails

  if (!res.ok) throw new Error('Failed to remove from wishlist');
  return res.json();
}
