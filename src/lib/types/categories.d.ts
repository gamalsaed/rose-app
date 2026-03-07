import { z } from 'zod';
import { addCategorySchema } from '../schemas/categories.schema';

export type Category = {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  isSuperAdmin: boolean;
  productsCount: number;
};

export type CategoriesResponse = PaginatedData<Category, 'categories'>;

// Add Category Types
export type AddCategoryFormData = z.infer<
  ReturnType<typeof addCategorySchema<Translations>>
>;
export type AddCategoryPayload = FormData<AddCategoryFormData>;
export type AddCategoryResponse = ApiResponse<{ category: Category }>;
