import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utilits/cn';
type MethodCardProps = {
  src: string;
  title: string;
  description: string;
  selectedMethod: 'cash' | 'credit' | null;
  method: 'cash' | 'credit';
  handleMethod: (text: 'cash' | 'credit') => void;
};

export default function MethodCard({
  src,
  title,
  description,
  selectedMethod,
  method,
  handleMethod,
}: MethodCardProps) {
  return (
    <div
      className={cn(
        'p-6 border border-zinc-200 rounded-md w-full  flex flex-col items-center cursor-pointer transition-all duration-300',
        selectedMethod === method && 'bg-zinc-200'
      )}
      onClick={() => handleMethod(method)}
    >
      <Image src={src} height={195} width={195} alt={title} />
      <h1
        className={cn(
          'text-zinc-800 text-2xl font-semibold',
          selectedMethod === method && 'text-maroon-600'
        )}
      >
        {title}
      </h1>
      <p className="text-zinc-500">{description}</p>
    </div>
  );
}
