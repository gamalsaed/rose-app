import { useTranslations } from 'next-intl';

import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

export default function AllCategoriesTable() {
  // Translation
  const t = useTranslations();

  return (
    <Card className="bg-white overflow-hidden max-h-full h-full shadow-none border-none min-h-0">
      <CardContent className="p-6 pe-4 flex flex-col min-h-0">
        {/* Title */}
        <h3 className="text-2xl font-semibold mb-3 shrink-0">
          {t('overview.all-categories')}
        </h3>

        <div className="pe-2">
          {/* Table */}
          <Table>
            <TableBody>
              {Array.from({ length: 6 }).map((_, index) => (
                <TableRow key={index}>
                  {/* Category Name */}
                  <TableCell className="font-medium w-full">
                    <Skeleton className="w-40 h-6" />
                  </TableCell>

                  {/* Number of Products Per Category */}
                  <TableCell className="text-right">
                    <Skeleton className="w-20 h-6" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
