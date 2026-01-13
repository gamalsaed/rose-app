import { NextResponse } from "next/server";

const apiUrl = process.env.BASE_API;

export async function GET() {
  const response = await fetch(`${apiUrl}/testimonials`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const data = await response.json();

  return NextResponse.json(data);
}
