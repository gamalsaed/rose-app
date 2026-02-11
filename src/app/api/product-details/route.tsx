import { NextRequest, NextResponse } from 'next/server';
import { getApiHeaders } from '@/lib/utilits/apis.utils';

import { API } from '@/lib/constants/api.constants';

export async function GET(request: NextRequest) {
  const headers = await getApiHeaders(request);
  const productId = request.nextUrl.searchParams.get('productId');

  if (!productId) {
    return NextResponse.json(
      { error: 'Product ID is required' },
      { status: 400 }
    );
  }

  const response = await fetch(`${API}/products/${productId}`, {
    method: 'GET',
    headers,
    cache: 'no-store',
  });

  const payload = await response.json();

  return NextResponse.json(payload);
}
