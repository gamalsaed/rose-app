declare type Product = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  imgCover: string;
  images: string[];
  price: number;
  priceAfterDiscount: number;
  quantity: number;
  category: string;
  occasion: string;
  createdAt: string;
  updatedAt: string;
  sold: number;
  rateAvg: number;
  rateCount: number;
  favoriteId: string | null;
  isInWishlist: boolean;
  isSuperAdmin: boolean;
};
declare type ProductFilters = {
  page?: number;
  limit?: number;
  sort?: string;
  category?: string;
  occasion?: string;
  rateAvg?: number;
  priceGte?: number;
  priceLte?: number;
};

declare type ProductsResponse = PaginatedData<Product, "products">;
