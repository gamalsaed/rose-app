import { z } from 'zod';
import {
  addCategorySchema,
  updateCategorySchema,
} from '../schemas/categories.schema';

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

// Get Category Types
export type GetCategoryResponse = ApiResponse<{ category: Category }>;

// Add Category Types
export type AddCategoryFormData = z.infer<
  ReturnType<typeof addCategorySchema<Translations>>
>;
export type AddCategoryPayload = FormData<AddCategoryFormData>;
export type AddCategoryResponse = ApiResponse<{ category: Category }>;

// Update Category Types
export type UpdateCategoryFormData = z.infer<
  ReturnType<typeof updateCategorySchema<Translations>>
>;
export type UpdateCategoryPayload = {
  id: string;
  formData: FormData<UpdateCategoryFormData>;
};
export type UpdateCategoryResponse = ApiResponse<{ category: Category }>;

// Delete Category Types
export type DeleteCategoryPayload = {
  id: string;
};
export type DeleteCategoryResponse = ApiResponse<object>;
