import { z } from 'zod';
import {
  overallStatisticsSchema,
  categoryStatisticsSchema,
} from '../schemas/overview.schema';

// Overall Statistics
export type OverallStatistics = z.infer<
  ReturnType<typeof overallStatisticsSchema>
>;
export type OverallStatisticsResponse = ApiResponse<{
  statistics: OverallStatistics;
}>;

// Category Statistics
export type CategoryStatistics = z.infer<
  ReturnType<typeof categoryStatisticsSchema>
>;
export type CategoryStatisticsResponse = ApiResponse<{
  statistics: CategoryStatistics;
}>;
