const BASE_URL = "https://flower.elevateegy.com/api/v1";

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
    typeof searchParams.occasion === "string"
      ? searchParams.occasion
      : undefined;

  // Parallel Fetching
  const [bestSellersRes, popularRes, occasionsRes] = await Promise.all([
    // Best Sellers
    fetch(`${BASE_URL}/products?sort=-sold&limit=10`, {
      cache: "no-store",
    }),

    // Most Popular Products (Filtered by Occasion)
    fetch(
      occasionId
        ? `${BASE_URL}/products?occasion=${occasionId}&limit=12`
        : `${BASE_URL}/products?limit=12&sort=-rateAvg`,
      { cache: "no-store" }
    ),

    // Occasions List
    fetch(`${BASE_URL}/occasions`, {
      cache: "force-cache",
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
