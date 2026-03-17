import { z } from 'zod';
import { Translations } from '../types/next-intl';

export const overallStatisticsSchema = (t: Translations) =>
  z.object({
    totalProducts: z.number().min(0, {
      message: t ? t('totalProducts-min') : 'Total products must be at least 0',
    }),
    totalOrders: z.number().min(0, {
      message: t ? t('totalOrders-min') : 'Total orders must be at least 0',
    }),
    totalCategories: z.number().min(0, {
      message: t
        ? t('totalCategories-min')
        : 'Total categories must be at least 0',
    }),
    totalRevenue: z.number().min(0, {
      message: t ? t('totalRevenue-min') : 'Total revenue must be at least 0',
    }),
  });

export const categoryStatisticsSchema = (t: Translations) =>
  z.array(
    z.object({
      _id: z.string(),
      name: z.string().min(2, {
        message: t ? t('name-min') : 'Name must be at least 2 characters',
      }),
      totalProducts: z.number().min(0, {
        message: t
          ? t('totalProducts-min')
          : 'Total products must be at least 0',
      }),
      totalRevenue: z.number().min(0, {
        message: t ? t('totalRevenue-min') : 'Total revenue must be at least 0',
      }),
    })
  );
