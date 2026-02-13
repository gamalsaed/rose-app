import * as z from 'zod';

export const priceFilterSchema = z.object({
  min: z.number().min(1, 'Minimum price must be at least 1'),
  max: z.number().min(100, 'Maximum price must be at least 100'),
}).refine((data) => data.max >= data.min, {
  message: 'Maximum price must be greater than or equal to minimum price',
});

export type PriceFilterInput = z.infer<typeof priceFilterSchema>;