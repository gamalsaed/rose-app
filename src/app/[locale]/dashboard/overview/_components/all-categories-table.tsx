import { useTranslations } from 'next-intl';

import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CategoryStatistics } from '@/lib/types/overview';

type AllCategoriesTableProps = {
  categories: CategoryStatistics;
};

export default function AllCategoriesTable({
  categories,
}: AllCategoriesTableProps) {
  // Translation
  const t = useTranslations();

  return (
    <Card className="bg-white overflow-hidden max-h-full h-full shadow-none border-none min-h-0">
      <CardContent className="p-6 pe-4 flex flex-col min-h-0">
        {/* Title */}
        <h3 className="text-2xl font-semibold mb-3 shrink-0">
          {t('overview.all-categories')}
        </h3>

        <ScrollArea className="h-[13.75rem] scroll-pl-2 pe-2">
          {/* Table */}
          <Table>
            <TableBody>
              {categories.map(category => (
                <TableRow key={category._id}>
                  {/* Category Name */}
                  <TableCell className="font-medium w-full">
                    {category.name}
                  </TableCell>

                  {/* Number of Products Per Category */}
                  <TableCell className="text-right">
                    <p className="text-sm font-medium bg-black/5 rounded-md px-2 py-1 whitespace-nowrap">
                      {category.totalProducts} {t('overview.products')}
                    </p>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
