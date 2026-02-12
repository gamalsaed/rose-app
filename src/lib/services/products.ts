import { ProductSuccessResponse } from '../types/products';
import { getAccessToken } from '../utilits/apis.utils';

const BASE_API = process.env.BASE_API;

// Define Interfaces
export interface ProductAPI {
  _id: string;
  title: string;
  price: number;
  priceAfterDiscount: number;
  imgCover: string;
  rateAvg: number; // Needed for ratings
  sold: number;
  occasion: string; // Occasion ID
  quantity: number; // To check stock
  createdAt: string; // Needed for "New"
}
// Occasion Interface
export interface Occasion {
  _id: string;
  name: string;
  slug: string;
}

//  Define the Fetch Function
export async function getHomePageData(searchParams: {
  [key: string]: string | string[] | undefined;
}) {
  const occasionId =
    typeof searchParams.occasion === 'string'
      ? searchParams.occasion
      : undefined;

  // Parallel Fetching
  const [bestSellersRes, popularRes, occasionsRes] = await Promise.all([
    // Best Sellers
    fetch(`${BASE_API}/products?sort=-sold&limit=10`, {
      cache: 'no-store',
    }),

    // Most Popular Products (Filtered by Occasion)
    fetch(
      occasionId
        ? `${BASE_API}/products?occasion=${occasionId}&limit=12`
        : `${BASE_API}/products?limit=12&sort=-rateAvg`,
      { cache: 'no-store' }
    ),

    // Occasions List
    fetch(`${BASE_API}/occasions`, {
      cache: 'force-cache',
    }),
  ]);

  const bestSellersData = await bestSellersRes.json();
  const popularData = await popularRes.json();
  const occasionsData = await occasionsRes.json();

  // Slice occasions to only 4 items as requested
  const allOccasions = (occasionsData.occasions || []) as Occasion[];
  const topFourOccasions = allOccasions.slice(0, 4);

  return {
    bestSellers: (bestSellersData.products || []) as ProductAPI[],
    popularProducts: (popularData.products || []) as ProductAPI[],
    occasions: topFourOccasions,
    selectedOccasionId: occasionId,
  };
}

export async function getProductDetails(productId: string) {
  const accessToken = await getAccessToken();

  const response = await fetch(`${BASE_API}/products/${productId}`, {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch product details');
  }

  const payload: ProductSuccessResponse = await response.json();

  return payload;
}
