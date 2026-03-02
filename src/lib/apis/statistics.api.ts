import { getUserToken } from '../utilits/get-token';

export async function getOrderStatistics() {
  try {
    // get user token
    const token = await getUserToken();

    if (!token) {
      throw new Error('unauthenticated');
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/statistics/orders`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('failed to fetch OrderStatistics');
    }

    const data = await response.json();
   
    return data;
  } catch (error) {
    console.error('getOrderStatistics error:', error);
    throw error;
  }
}