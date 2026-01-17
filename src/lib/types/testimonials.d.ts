export type Testimonial = {
  _id: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    photo: string;
  };
  rating: number;
  content: string;
  status: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type PaginatedTestimonials = PaginatedData<Testimonial, "testimonials">;
export type TestimonialsResponse = ApiResponse<PaginatedTestimonials>;
export type TestimonialsSuccessResponse =
  SuccessResponse<PaginatedTestimonials>;
