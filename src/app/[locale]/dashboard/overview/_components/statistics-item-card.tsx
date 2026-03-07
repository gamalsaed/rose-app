import { cn } from '@/lib/utilits/cn';

import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

type StatisticsItemCardProps = {
  icon: LucideIcon;
  title: string;
  value: string | React.ReactNode;
  cardTheme: 'destructive' | 'purple' | 'success' | 'blue';
};

export default function StatisticsItemCard({
  icon: Icon,
  title,
  value,
  cardTheme,
}: StatisticsItemCardProps) {
  return (
    <Card className="shadow-none border-none">
      <CardContent
        className={cn(
          'flex flex-col p-4 h-full rounded-[1rem]',
          cardTheme === 'destructive' && 'text-maroon-600 bg-maroon-50',
          cardTheme === 'blue' && 'text-blue-600 bg-[#0063D0]/5',
          cardTheme === 'purple' && 'text-[#753CBF] bg-[#753CBF]/5',
          cardTheme === 'success' && 'text-emerald-600 bg-[#0089610D]/5'
        )}
      >
        {/* Icon */}
        <Icon size={34} />

        {/* Value */}
        <p className="text-2xl font-semibold mt-2 whitespace-nowrap">{value}</p>

        {/* Title */}
        <h4 className="text-zinc-800 mt-auto">{title}</h4>
      </CardContent>
    </Card>
  );
}
