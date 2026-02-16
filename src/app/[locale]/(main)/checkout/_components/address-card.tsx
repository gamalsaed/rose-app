'use client';

import { Item, ItemContent, ItemTitle } from '@/components/ui/item';
import { Badge } from '@/components/ui/badge';
import { Phone } from 'lucide-react';
import { cn } from '@/lib/utilits/cn';
import { Address } from '@/lib/types/checkout.t';

type AddressProps = {
  handleAddress: (add: Address) => void;
  selectedAddress: Address | null;
} & Address;

export function AddressItem({
  handleAddress,
  selectedAddress,
  ...props
}: AddressProps) {
  // Variables
  let selected = selectedAddress && selectedAddress._id === props._id;

  return (
    <div
      className="flex w-full flex-col gap-3 mt-3"
      onClick={() => handleAddress({ ...props })}
    >
      <Item
        variant="outline"
        className={cn(
          'transition-all duration-300 cursor-pointer',
          selected ? 'bg-maroon-600 cursor-default' : 'hover:bg-zinc-50'
        )}
      >
        <ItemContent>
          <ItemTitle className="flex justify-between mb-2.5">
            {/* City */}
            <h3
              className={cn(
                'text-zinc-800 text-2xl capitalize',
                selected && 'text-zinc-50'
              )}
            >
              {props.city}
            </h3>

            {/* Phone */}
            <div className="float-right  flex gap-1.5 items-center">
              <div
                className={cn(
                  'w-fit p-1.5 bg-maroon-600 rounded-full text-white',
                  selected && 'bg-zinc-50 text-maroon-600'
                )}
              >
                <Phone size={20} />
              </div>
              <p
                className={cn(
                  'text-lg text-zinc-500',
                  selected && 'text-zinc-50'
                )}
              >
                {props.phone}
              </p>
            </div>
          </ItemTitle>

          {/* Description */}
          <Badge
            variant="muted"
            className={cn(
              'w-fit capitalize',
              selected && 'text-zinc-50 bg-zinc-800 '
            )}
          >
            {props.street}, {props.city}
          </Badge>
        </ItemContent>
      </Item>
    </div>
  );
}
