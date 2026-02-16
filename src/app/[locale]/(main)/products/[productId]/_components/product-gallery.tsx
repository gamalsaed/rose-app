'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utilits/cn';

import type { CarouselApi } from '@/components/ui/carousel';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';

import { ImageIcon } from 'lucide-react';

type ProductGalleryProps = {
  images: string[];
  className?: string;
  title: string;
};

export function ProductGallery({
  images,
  title,
  className,
}: ProductGalleryProps) {
  // Translations
  const t = useTranslations();

  // States
  const [mainApi, setMainApi] = React.useState<CarouselApi | null>(null);
  const [thumbApi, setThumbApi] = React.useState<CarouselApi | null>(null);
  const [selected, setSelected] = React.useState(0);

  // Hooks

  // Sync selected index when main changes
  React.useEffect(() => {
    if (!mainApi) return;

    const onSelect = () => {
      const idx = mainApi.selectedScrollSnap();
      setSelected(idx);
      // keep thumbnails centered-ish on selection
      thumbApi?.scrollTo(idx);
    };

    onSelect();
    mainApi.on('select', onSelect);
    mainApi.on('reInit', onSelect);

    return () => {
      mainApi.off('select', onSelect);
      mainApi.off('reInit', onSelect);
    };
  }, [mainApi, thumbApi]);

  // Functions
  const goTo = React.useCallback(
    (index: number) => {
      setSelected(index);
      mainApi?.scrollTo(index);
      thumbApi?.scrollTo(index);
    },
    [mainApi, thumbApi]
  );

  if (!images?.length)
    return (
      <Empty className="bg-muted/30 h-full">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <ImageIcon />
          </EmptyMedia>
          <EmptyTitle>{t('product-details.no-available-images')}</EmptyTitle>
          <EmptyDescription className="max-w-xs text-pretty">
            {t('product-details.no-available-images-description')}
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );

  return (
    <div className={cn('flex flex-col w-full max-w-3xl', className)}>
      {/* MAIN */}
      <Carousel setApi={setMainApi} opts={{ loop: false }} className="w-full">
        <CarouselContent>
          {images.map((img, i) => (
            <CarouselItem key={img + i}>
              <div className="relative aspect-[100/66] w-full overflow-hidden rounded-2xl bg-muted">
                <Image
                  src={img}
                  alt={`${title} Product`}
                  fill
                  className="object-cover"
                  priority={i === 0}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* THUMBNAILS */}
      <div className=" mt-2 h-[20%]">
        <Carousel
          setApi={setThumbApi}
          opts={{
            align: 'start',
            dragFree: true,
            containScroll: 'trimSnaps',
          }}
          className="w-full h-full"
        >
          <CarouselContent className="-ml-1 pt-0.5">
            {images.map((img, i) => {
              const isActive = i === selected;

              return (
                <CarouselItem
                  key={img + i}
                  className="basis-[calc((((100vw-224px)/2)*0.85)*0.2)] pis-3"
                >
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    className={cn(
                      'relative h-[calc((((100vw-224px)/2)*0.85)*0.2)] aspect-[80/100] overflow-hidden rounded-lg bg-muted outline-none ring-offset-background transition',
                      'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                      isActive && 'ring-2 ring-maroon-600'
                    )}
                    aria-label={`Go to image ${i + 1}`}
                  >
                    {/* Thumbnail Image */}
                    <Image
                      src={img}
                      alt={`Product Image Thumbnail ${i + 1}`}
                      fill
                      className="object-cover"
                    />

                    {/* Overlay */}
                    {!isActive && (
                      <div className="absolute inset-0 bg-black/30 hover:bg-transparent" />
                    )}
                  </button>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}
