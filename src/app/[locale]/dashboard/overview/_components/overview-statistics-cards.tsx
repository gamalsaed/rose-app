import { useTranslations } from 'next-intl';

import { Card, CardContent } from '@/components/ui/card';
import StatisticsItemCard from './statistics-item-card';
import { OverallStatistics } from '@/lib/types/overview';

import {
  Package,
  ReceiptText,
  ClipboardList,
  CircleDollarSign,
} from 'lucide-react';

type OverallStatisticsCardsProps = OverallStatistics;

export default function OverallStatisticsCards(
  overallStatistics: OverallStatisticsCardsProps
) {
  // Translation
  const t = useTranslations();

  // Data
  const statisticsCards = [
    {
      icon: Package,
      title: t('overview.total-products'),
      value: t('decimal-integer', { amount: overallStatistics.totalProducts }),
      cardTheme: 'destructive',
    },
    {
      icon: ReceiptText,
      title: t('overview.total-orders'),
      value: t('decimal-integer', {
        amount: overallStatistics.totalOrders,
      }),
      cardTheme: 'blue',
    },
    {
      icon: ClipboardList,
      title: t('overview.total-categories'),
      value: t('decimal-integer', {
        amount: overallStatistics.totalCategories,
      }),
      cardTheme: 'purple',
    },
    {
      icon: CircleDollarSign,
      title: t('overview.total-revenue'),
      value: (
        <>
          {t('price-without-currency', {
            amount: overallStatistics.totalRevenue,
          })}{' '}
          <span className="text-sm font-medium">{t('currency')}</span>
        </>
      ),
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
