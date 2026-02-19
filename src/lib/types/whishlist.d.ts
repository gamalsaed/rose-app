

declare type WishlistData = {
  _id: string;               
  user: string;             
  products: Product[]; 
};

declare type WishlistResponse = SuccessResponse<{
  count: number;         
  wishlist: WishlistData;
}>;
type WishlistApiRouteResponse = {
  success: boolean;
  message?: string;
  data: WishlistResponse;
};
declare type CheckWishlistResponse = {
  message: string;
  isInWishlist: boolean;
};

declare type WishlistApiResponse = ApiResponse<WishlistApiRouteResponse>;

