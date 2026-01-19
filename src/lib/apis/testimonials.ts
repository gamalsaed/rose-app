import {
  TestimonialsResponse,
  TestimonialsSuccessResponse,
} from "../types/testimonials";

const apiUrl = process.env.BASE_API;

export const getTestimonials = async () => {
  const response = await fetch(`${apiUrl}/testimonials`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
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
