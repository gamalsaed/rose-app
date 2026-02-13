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
  // ADDED FOR FILTER SECTION
  image: string
  createdAt: string
  updatedAt: string
  isSuperAdmin: boolean
  productsCount: number
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
  const [bestSellersRes, popularRes, occasionsRes, priceRes] = await Promise.all([
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

    // Price Products
    fetch(`${BASE_URL}/products?sort=-price`, {
      cache: "no-store",
    }),
  ]);

  const bestSellersData = await bestSellersRes.json();
  const popularData = await popularRes.json();
  const occasionsData = await occasionsRes.json();
  const priceData = await priceRes.json();
  // Slice occasions to only 4 items as requested
  const allOccasions = (occasionsData.occasions || []) as Occasion[];
  const topFourOccasions = allOccasions.slice(0, 4);

  return {
    bestSellers: (bestSellersData.products || []) as ProductAPI[],
    popularProducts: (popularData.products || []) as ProductAPI[],
    priceProducts: (priceData.products || []) as ProductAPI[],
    occasions: topFourOccasions,
    selectedOccasionId: occasionId,
  };
}
