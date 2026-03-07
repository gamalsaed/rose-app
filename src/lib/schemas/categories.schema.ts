import { z } from 'zod';
import { Translations } from '../types/next-intl';

/** Schema for add-category form submitted as FormData (name + image File). */
export const addCategorySchema = (t: Translations) =>
  z.object({
    name: z.string().min(2, {
      message: t ? t('name-min') : 'Name must be at least 2 characters',
    }),
    image: z.instanceof(File, {
      message: t ? t('image-required') : 'Image is required',
    }),
  });

export const updateCategorySchema = (t: Translations) =>
  z.object({
    name: z.string().min(2, {
      message: t ? t('name-min') : 'Name must be at least 2 characters',
    }),
  });
