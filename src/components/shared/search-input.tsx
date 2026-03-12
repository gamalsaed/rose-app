'use client';

import { ChangeEventHandler } from 'react';
import { cn } from '@/lib/utilits/cn';

import { Input } from '@/components/ui/input';

import { Search } from 'lucide-react';

interface SearchInputProps {
  placeholder: string;
  className?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: string;
}

export default function SearchInput({
  placeholder,
  className,
  onChange,
  value,
}: SearchInputProps) {
  return (
    <div className="relative text-zinc-800 w-full flex items-center ">
      <Search size={24} className="text-zinc-400 absolute  left-2.5" />
      <Input
        className={cn('pl-11', className)}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}
