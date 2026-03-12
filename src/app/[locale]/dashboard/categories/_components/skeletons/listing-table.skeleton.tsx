import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

export function ListingTableSkeleton() {
  return (
    <div className="flex flex-col p-6 pt-0 rounded-b-[1rem] bg-white overflow-hidden">
      <Table className="max-h-full overflow-auto">
        <TableHeader className="w-full bg-zinc-50 top-0">
          <TableRow>
            <TableHead className="flex-shrink-0 rounded-tl-[.625rem] text-zinc-900 text-sm font-medium">
              <Skeleton className="h-6 w-40" />
            </TableHead>
            <TableHead className="text-zinc-900 text-sm font-medium">
              <Skeleton className="h-6 w-40" />
            </TableHead>
            <TableHead className="text-right w-full rounded-tr-[.625rem]"></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="w-full">
          {(Array.from({ length: 7 }) || []).map((_, index) => (
            <TableRow key={index} className="hover:bg-maroon-50 w-full">
              {/* Name Value */}
              <TableCell className="flex-shrink-0 text-sm font-semibold">
                <Skeleton className="h-6 w-40" />
              </TableCell>

              {/* Num of Products */}
              <TableCell className="text-sm whitespace-nowrap">
                <Skeleton className="h-6 w-40" />
              </TableCell>

              {/* Actions  */}
              <TableCell className=" flex text-right w-full">
                <Skeleton className="ms-auto h-7 w-16" />
                <Skeleton className="h-7 ms-2.5 w-16" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
