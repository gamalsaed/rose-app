declare type OrderStatus = {
  _id: string | null;
  count: number;
}



declare type Revenue = {
  _id: string; 
  revenue: number;
  count: number;
}

declare type OrderStatistics = {
  ordersByStatus: OrderStatus[];
  dailyRevenue: Revenue[];
  monthlyRevenue: Revenue[];
}


declare type OrderStatisticsResponse = {
  message: string;
  statistics: OrderStatistics;
}
