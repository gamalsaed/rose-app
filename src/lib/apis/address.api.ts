import { getUserToken } from '../utilits/get-token';

export async function getAllAddresses() {
  try {
    // get user token
    const token = await getUserToken();

    if (!token) {
      throw new Error('You should sign in');
    }

    const response = await fetch(`${process.env.BASE_API}/addresses`, {
      next:{tags:["addresses"]},
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to get addresses');
    }

    const data = await response.json();
    return data.addresses;
  } catch (error) {
    console.error('getAllAddresses error:', error);
    throw error; 
  }
}
