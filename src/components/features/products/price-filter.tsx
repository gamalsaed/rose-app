'use client';
import { Input } from '@/components/ui/input';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDebounce } from './_hooks/debounce';
import { Button } from '@/components/ui/button';
import { RotateCw, X } from 'lucide-react';
import { Field } from '@/components/ui/field';

export default function AllPriceFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [reset, setReset] = useState(true);

  //states
  const [minPrice, setMinPrice] = useState(
    Number(searchParams.get('price[gte]') || 0)
  );
  const [maxPrice, setMaxPrice] = useState(
    Number(searchParams.get('price[lte]') || 1000000)
  );
  //debounced values
  const debouncedMin = useDebounce(minPrice, 500);
  const debouncedMax = useDebounce(maxPrice, 500);

  //useEffect to update the URL search params when debounced values change
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (debouncedMin > 0) {
      params.set('price[gte]', debouncedMin.toString());
    } else {
      params.delete('price[gte]');
    }

    if (debouncedMax < 1000000) {
      params.set('price[lte]', debouncedMax.toString());
    } else {
      params.delete('price[lte]');
    }

    //  Update the URL with new search params
    router.push(`/products?${params.toString()}`);
  }, [debouncedMin, debouncedMax, router, searchParams]);

  return (
    <>
    {/* header section */}
      <div className="flex justify-between ">
        <div className="text-lg">
          <h2 className="font-primary font-semibold">Price</h2>
        </div>
        <div className="w-fit">
          <Button
            variant="ghost"
            className="border-none text-red-400"
            onClick={() => {
              if (reset) {
                setReset(false);
                router.push('/products');
              } else {
                setMinPrice(0);
                setMaxPrice(1000000);
                router.push('/products');
              }
            }}
          >
            <X className="text-red-500" /> Reset
          </Button>
        </div>
      </div>
{/* buttons sections */}
      <div className="flex gap-2">
        <Input
          type="number"
          placeholder="1"
          defaultValue={minPrice}
          onChange={e => setMinPrice(Number(e.target.value))}
        />

        <Input
          type="number"
          placeholder="1000000"
          defaultValue={maxPrice}
          onChange={e => setMaxPrice(Number(e.target.value))}
        />
      </div>

      {/* reset all section */}
      <div className="w-full pt-8 pb-10">
        <Field orientation="horizontal">
          <Button
            variant="secondary"
            type="reset"
            onClick={() => {
              if (reset) {
                setReset(false);
                router.push('/products');
              } else {
                setMinPrice(0);
                setMaxPrice(1000000);
                router.push('/products');
              }
            }}
          >
            <RotateCw /> reset all
          </Button>
        </Field>
      </div>
    </>
  );
}
