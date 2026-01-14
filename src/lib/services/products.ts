// src/services/product.ts

const BASE_URL = "https://flower.elevateegy.com/api/v1/products";

export interface ProductAPI {
  _id: string;
  title: string;
  price: number;
  priceAfterDiscount: number;
  imgCover: string;
  rateAvg: number; // Needed for ratings
  sold: number; // Needed for "Hot" badge
  occasion: string; // Changed to string (ID)
  quantity: number; // Needed for "Out of Stock"
  createdAt: string; // Needed for "New"
}

export const getMostPopularProducts = async () => {
  try {
    // Fetch products sorted by 'sold' in descending order
    const response = await fetch(`${BASE_URL}?sort=-sold`, {
      cache: "no-store",
    });

    if (!response.ok) throw new Error("Failed to fetch");

    const data = await response.json();
    return data.products as ProductAPI[];
  } catch (error) {
    console.error("Error fetching most popular products:", error);
    return [];
  }
};
export const getBestSellingProducts = async () => {
  try {
    // Fetch top 20 best selling products
    const response = await fetch(`${BASE_URL}?sort=-sold&limit=20`, {
      cache: "no-store",
    });

    if (!response.ok) throw new Error("Failed to fetch best sellers");

    const data = await response.json();
    return data.products as ProductAPI[];
  } catch (error) {
    console.error("Error fetching best selling products:", error);
    return [];
  }
};
