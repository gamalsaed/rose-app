import { PriceRange } from '../types/search-filters';

const BASE_URL = 'https://flower.elevateegy.com/api/v1';

export default async function FilterOccasion(currentPage: number) {
  const response = await fetch(
    `https://flower.elevateegy.com/api/v1/occasions?limit=${6}&page=${currentPage}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  if (!response.ok) {
    throw new Error('Failed to fetch occasions');
  }

  const payload = await response.json();

  return payload;
}

export async function GetAllPriceFilter(price: PriceRange) {
  try {
    const response = await fetch(
      `https://flower.elevateegy.com/api/v1/products?price[gte]=${price.min}&price[lte]=${price.max}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (!response.ok) {
      throw new Error('Failed to fetch occasions');
    }

    const payload = await response.json();

    return payload.data;
  } catch (error) {
    console.log('Error fetching price filter:', error);
    throw error; // Re-throw the error after logging it
  }
}
