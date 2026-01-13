import {
  TestimonialsResponse,
  TestimonialsSuccessResponse,
} from "../types/testimonials";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

export const getTestimonials = async () => {
  const response = await fetch(`${baseUrl}/api/testimonials`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch testimonials");
  }

  const payload: TestimonialsResponse = await response.json();

  if (payload.message !== "success") {
    throw new Error(payload.message);
  }

  return payload as TestimonialsSuccessResponse;
};
