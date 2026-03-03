const BASE_URL = 'https://flower.elevateegy.com/api/v1';

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
  image: string;
  createdAt: string;
  updatedAt: string;
  isSuperAdmin: boolean;
  productsCount: number;
}

//  Define the Fetch Function
export async function getProductsPageData(searchParams: {
  [key: string]: string | string[] | undefined;
}) {
  const occasionId =
    typeof searchParams.occasion === 'string'
      ? searchParams.occasion
      : undefined;

  const minPrice = Number(searchParams['price[gte]'] || 0);
  const maxPrice = Number(searchParams['price[lte]'] || 1000000);

  // Build the Products URL with filters
  let productsUrl = `${BASE_URL}/products?limit=12`;

  if (occasionId) {
    productsUrl += `&occasion=${occasionId}`;
  }

  if (minPrice > 0) {
    productsUrl += `&price[gte]=${minPrice}`;
  }

  if (maxPrice < 1000000) {
    productsUrl += `&price[lte]=${maxPrice}`;
  }

  // Parallel Fetching
  const [productsRes, occasionsRes] = await Promise.all([
    // Products List with filters applied
    fetch(productsUrl, { cache: 'no-store' }),

    // Occasions List
    fetch(`${BASE_URL}/occasions`, { cache: 'force-cache' }),
  ]);

  const productsData = await productsRes.json();
  const occasionsData = await occasionsRes.json();

  const allOccasions = (occasionsData.occasions || []) as Occasion[];
  const topFourOccasions = allOccasions.slice(0, 4);

  return {
    products: (productsData.products || []) as ProductAPI[],
    occasions: topFourOccasions,
    selectedOccasionId: occasionId,
  };
}
