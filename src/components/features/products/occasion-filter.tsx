'use client';
import React, { useState } from 'react';
import { Occasion } from '@/lib/services/products';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useInfiniteQuery } from '@tanstack/react-query';
import FilterOccasion from '@/lib/services/filters';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';

export default function OccasionsFilter({
  occasion,
}: {
  occasion: Occasion[];
}) {
  const router = useRouter();

  // when active state
  const [activeOccasion, setActiveOccasion] = useState<string | null>(
    occasion[0]?._id || null
  );
  const [reset, setReset] = useState(true);

  const {
    data: payload,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['occasions'],
    queryFn: ({ pageParam }) => FilterOccasion(pageParam),
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      if (lastPage?.metadata?.currentPage === lastPage?.metadata?.totalPages)
        return undefined;
      return lastPage.metadata.currentPage + 1;
    },
  });

  const occasions = payload?.pages.flatMap(p => p?.occasions || []) ?? [];

  const handleOccasionClick = (id: string) => {
    const newId = activeOccasion === id ? '' : id;
    setActiveOccasion(newId);

    if (newId) router.push(`/products?occasion=${newId}`);
    else router.push('/products');
  };

  return (
    <>
      {/* header section */}
      <div className="flex justify-between ">
        <div className="text-lg">
          <h2 className="font-primary font-semibold">Occasions</h2>
        </div>
        <div className="w-fit">
          {/* active condition */}
          <Button
            variant="ghost"
            className="border-none text-red-400"
            onClick={() => {
              if (occasions.length > 0) {
                const reset = occasions[0]._id;
                setActiveOccasion(reset);
                router.push(`/products?occasion=${reset}`);
              } else {
                setReset(false);
                router.push('/products');
              }
            }}
          >
            <X className="text-red-500" /> Reset
          </Button>
        </div>
      </div>
      {/* infinitescroll section */}
      <div id="scrollableDiv" className="overflow-y-auto max-h-72">
        <InfiniteScroll
          dataLength={occasions.length}
          next={fetchNextPage}
          hasMore={hasNextPage}
          loader={<div className="py-6 text-center">Loading..</div>}
          scrollableTarget="scrollableDiv"
        >
          <div className="grid grid-cols-2 gap-2 p-1">
            {isLoading && occasions.length === 0 ? (
              <div className="p-4 space-y-4">
                <div className="flex gap-3 px-4 py-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-4/5" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              </div>
            ) : (
              <>
                {occasions.map((occasion: Occasion) => {
                  const isSelected = activeOccasion === occasion._id;
                  return (
                    <Card
                      key={occasion._id}
                      onClick={() => handleOccasionClick(occasion._id)}
                      className={`flex-shrink-0 w-32 h-20 cursor-pointer rounded-lg overflow-hidden 
                       border transition-all duration-200 relative group
                      ${activeOccasion === occasion._id ? 'border-red-500 shadow-lg' : ''}`}
                    >
                      <Image
                        src={`https://flower.elevateegy.com/uploads/${occasion.image}`}
                        alt={occasion.name}
                        fill
                        className="object-cover bg-gradient-to-t from-black/70 via-black/50 transition-transform duration-300 group-hover:bg-maroon-300"
                        sizes="133px"
                      />

                      {/* Dark Overlay at Bottom */}
                      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/70 via-black/40 to-transparent hover:via-maroon-400" />

                      {/* Occasion Name - Centered at Bottom */}
                      <div className="absolute bottom-7 left-0 right-0 px-2">
                        <span
                          className={`text-xs font-semibold text-white block text-center ${
                            isSelected ? 'text-shadow' : ''
                          }`}
                        >
                          {occasion.name}
                        </span>
                      </div>

                      {/* Selection Indicator - Top Right */}
                      {isSelected && (
                        <div className="absolute top-1.5 right-1.5">
                          <div className="transition-all "></div>
                        </div>
                      )}
                    </Card>
                  );
                })}
              </>
            )}
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
}
