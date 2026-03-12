'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from '@/i18n/navigation';

import SearchInput from '@/components/shared/search-input';

export function ListingSearch() {
  // Navigation
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') ?? '';

  // States
  const [value, setValue] = useState(initialSearch);
  const [debouncedValue, setDebouncedValue] = useState(initialSearch);

  // Refs
  const isInitialMount = useRef(true);

  // Hooks
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, 500);

    return () => clearTimeout(timer);
  }, [value]);

  useEffect(() => {
    const currentSearch = searchParams.get('search') ?? '';

    // Don't update URL on initial mount – preserves page=2 etc. when refreshing
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Only push when the user actually changed the search term
    if (debouncedValue === currentSearch) return;

    const params = new URLSearchParams(window.location.search);
    if (debouncedValue) {
      params.set('search', debouncedValue);
    } else {
      params.delete('search');
    }

    //Reset page number parameter in the URL
    params.set('page', '1');

    router.push(`/dashboard/categories?${params.toString()}`);
  }, [debouncedValue, router, searchParams]);

  return (
    <SearchInput
      className="my-4"
      placeholder="Search categories"
      value={value}
      onChange={e => setValue(e.target.value)}
    />
  );
}
