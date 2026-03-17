import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

export const ProductInfoSkeleton = () => {
  return (
    <div className="flex flex-col w-full h-[calc((100vw-224px)/2*0.85)]">
      {/* Title */}
      <Skeleton className="w-[80%] h-8 mb-2" />

      {/* Pricing */}
      <div className="flex gap-2">
        <Skeleton className="w-[30%] h-7" />
        <Skeleton className="w-[30%] h-7" />
      </div>

      {/* Rating */}
      <Separator className="my-4" />
      <Skeleton className="w-1/2 h-6" />
      <Separator className="my-4" />

      {/* Description */}
      <Skeleton className="w-full h-4 mb-2" />
      <Skeleton className="w-full h-4 my-2" />
      <Skeleton className="w-full h-4 my-2" />
      <Skeleton className="w-3/4 h-4" />

      {/* Actions */}
      <div className="flex gap-2 mt-auto">
        <Skeleton className="w-9 h-9" />
        <Skeleton className="w-full h-9" />
      </div>
    </div>
  );
};
