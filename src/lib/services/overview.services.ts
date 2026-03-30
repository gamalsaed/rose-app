import {
  OverallStatisticsResponse,
  CategoryStatisticsResponse,
} from '../types/overview';

import { getAccessToken } from '../utilits/apis.utils';

const BASE_API = process.env.BASE_API as string;

export async function getOverallStatistics() {
  const accessToken = await getAccessToken();

  const response = await fetch(`${BASE_API}/statistics/overall`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch overall statistics');
  }

  const payload: OverallStatisticsResponse = await response.json();

  if ('error' in payload) {
    throw new Error(payload.error);
  }

  return payload;
}

export async function getCategoryStatistics() {
  const accessToken = await getAccessToken();

  const response = await fetch(`${BASE_API}/statistics/categories`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch category statistics');
  }

  const payload: CategoryStatisticsResponse = await response.json();

  if ('error' in payload) {
    throw new Error(payload.error);
  }

  return payload;
}
