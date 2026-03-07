'use client';

import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { useEffect, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Download,
} from 'lucide-react';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utilits/cn';
import { useLocale } from 'next-intl';

type GalleryModalProps = {
  images: string | string[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function GalleryModal({
  images,
  open,
  onOpenChange,
}: GalleryModalProps) {
  // Translation
  const locale = useLocale();
  const isRTL = locale === 'ar';

  // State
  const imageList = Array.isArray(images) ? images : [images];
  const [selected, setSelected] = useState(0);
  const [zoom, setZoom] = useState(1);

  // Ref
  const [emblaRef, emblaApi] = useEmblaCarousel({
    direction: isRTL ? 'rtl' : 'ltr',
    loop: true,
  });

  // Variables
  const showControls = imageList.length > 1;

  // Effects
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelected(emblaApi.selectedScrollSnap());
      setZoom(1);
    };

    emblaApi.on('select', onSelect);
    onSelect();
  }, [emblaApi]);

  // Functions
  const zoomIn = () => setZoom(prev => Math.min(prev + 0.3, 3));
  const zoomOut = () => setZoom(prev => Math.max(prev - 0.3, 1));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[933px] h-[690px] rounded-2xl px-[72px]">
        {/* top actions */}
        <div className="flex justify-end gap-2 my-4">
          <Button
            size="icon"
            variant="outline"
            className="rounded-full w-9 h-9"
            onClick={zoomIn}
          >
            <ZoomIn size={18} />
          </Button>

          <Button
            size="icon"
            variant="outline"
            className="rounded-full w-9 h-9"
            onClick={zoomOut}
          >
            <ZoomOut size={18} />
          </Button>

          <a href={imageList[selected]} download>
            <Button
              size="icon"
              variant="outline"
              className="rounded-full w-9 h-9"
            >
              <Download size={18} />
            </Button>
          </a>
        </div>

        {/* carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {imageList.map((img, index) => (
              <div
                key={index}
                className="basis-full shrink-0 flex justify-center w-[798px] h-[480px] overflow-hidden border border-[#00000014] rounded-lg"
              >
                <div
                  style={{
                    transform: `scale(${zoom})`,
                    transition: 'transform 0.3s',
                  }}
                >
                  <Image
                    src={img}
                    alt="product"
                    width={400}
                    height={500}
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* controls */}
        {showControls && (
          <div className="flex items-center justify-between mt-6">
            {/* dots */}
            <div className={cn('flex gap-2', isRTL && 'flex-row-reverse')}>
              {imageList.map((_, i) => {
                const index = isRTL ? imageList.length - 1 - i : i;
                return (
                  <button
                    key={i}
                    onClick={() => emblaApi?.scrollTo(index)}
                    className={cn(
                      'w-3 h-3 rounded-full',
                      selected === index ? 'bg-maroon-600' : 'bg-gray-300'
                    )}
                  />
                );
              })}
            </div>

            {/* arrows */}
            <div className="flex gap-2">
              <Button
                size="icon"
                variant="outline"
                className="rounded-full w-9 h-9"
                onClick={() => emblaApi?.scrollPrev()}
              >
                <ChevronLeft
                  size={25}
                  className='rtl:rotate-180'
                />
              </Button>

              <Button
                size="icon"
                variant="outline"
                className="rounded-full w-9 h-9"
                onClick={() => emblaApi?.scrollNext()}
              >
                <ChevronRight
                  size={25}
                  className='rtl:rotate-180'
                />
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

