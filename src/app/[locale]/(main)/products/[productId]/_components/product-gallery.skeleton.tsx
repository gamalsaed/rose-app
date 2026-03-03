import { Skeleton } from '@/components/ui/skeleton';

export const ProductGallerySkeleton = () => {
  return (
    <div className="w-full h-[calc((100vw-224px)/2*0.85)]">
      {/* Main Image */}
      <Skeleton className="w-full h-[80%] rounded-md" />

      {/* Thumbnails */}
      <div className="flex flex-wrap gap-2 h-[20%] pt-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="w-[14.8%] h-full" />
        ))}
      </div>
    </div>
  );
};
