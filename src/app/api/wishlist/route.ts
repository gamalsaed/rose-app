import { NextResponse } from 'next/server';
import { getUserToken } from '@/lib/utilits/get-token';

const BASE_API = process.env.BASE_API;

export async function GET() {
  const token = await getUserToken();
  if (!token) return NextResponse.json({ data: null, success: false, message: 'UNAUTHORIZED' });

  const res = await fetch(`${BASE_API}wishlist/`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
  });

  const data = await res.json();
  return NextResponse.json({ data, success: true });
}

export async function POST(req: Request) {
  const token = await getUserToken();
  if (!token) return NextResponse.json({ data: null, success: false, message: 'UNAUTHORIZED' });

  const { productId } = await req.json();

  const res = await fetch(`${BASE_API}wishlist/`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId }),
  });

  const data = await res.json();
  return NextResponse.json({ data, success: true });
}

export async function DELETE(req: Request) {
  const token = await getUserToken();
  if (!token)
    return NextResponse.json({ data: null, success: false, message: 'UNAUTHORIZED' });

  const url = new URL(req.url);
  const productId = url.searchParams.get('productId'); 
  console.log('DELETE productId:', productId); 

  const res = await fetch(`${BASE_API}wishlist/${productId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();
  return NextResponse.json({ data, success: true });
}
