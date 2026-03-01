import { useTranslations } from 'next-intl';

import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import StatisticsItemCard from './statistics-item-card';

import {
  Package,
  ReceiptText,
  ClipboardList,
  CircleDollarSign,
} from 'lucide-react';

export default function OverallStatisticsCardsSkeleton() {
  // Translation
  const t = useTranslations();

  // Data
  const statisticsCards = [
    {
      icon: Package,
      title: t('overview.total-products'),
      value: <Skeleton className="w-full h-6" />,
      cardTheme: 'destructive',
    },
    {
      icon: ReceiptText,
      title: t('overview.total-orders'),
      value: <Skeleton className="w-full h-6" />,
      cardTheme: 'blue',
    },
    {
      icon: ClipboardList,
      title: t('overview.total-categories'),
      value: <Skeleton className="w-full h-6" />,
      cardTheme: 'purple',
    },
    {
      icon: CircleDollarSign,
      title: t('overview.total-revenue'),
      value: <Skeleton className="w-full h-6" />,
      cardTheme: 'success',
    },
  ] as const;

  return (
    <Card className="border-none shadow-none bg-white">
      <CardContent className=" grid grid-cols-2 gap-4 p-6">
        {statisticsCards?.map?.(card => (
          <StatisticsItemCard
            key={card.title}
            icon={card.icon}
            title={card.title}
            value={card.value}
            cardTheme={card.cardTheme}
          />
        ))}
      </CardContent>
    </Card>
  );
}
