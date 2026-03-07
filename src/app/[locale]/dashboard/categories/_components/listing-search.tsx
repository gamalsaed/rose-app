'use client';
import { useState, useEffect } from 'react';
import { useRouter } from '@/i18n/navigation';

import SearchInput from '@/components/shared/search-input';

export function ListingSearch() {
  // Navigation
  const router = useRouter();

  // states
  const [value, setValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');

  // Hooks
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, 500);

    return () => clearTimeout(timer);
  }, [value]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    // Update search key parameter in the URL
    if (debouncedValue) {
      params.set('search', debouncedValue);
    } else {
      params.delete('search');
    }

    //Reset page number parameter in the URL
    params.set('page', '1');

    router.push(`/dashboard/categories?${params.toString()}`);
  }, [debouncedValue, router]);

  return (
    <SearchInput
      className="my-4"
      placeholder="Search categories"
      value={value}
      onChange={e => setValue(e.target.value)}
    />
  );
}
