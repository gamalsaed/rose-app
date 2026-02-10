'use client';
import type { ProductFilters } from '@/lib/apis/products.api';

type Props = {
  onChange: (filters: ProductFilters) => void;
};
// Test filter component for experimenting with product filters
export default function TestFilterWrapper({ onChange }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={() =>
          onChange({ category: '673c47751159920171827c93' })
        }
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Category 1
      </button>

      <button
        onClick={() => onChange({})}
        className="px-4 py-2 bg-gray-200 rounded"
      >
        All
      </button>
    </div>
  );
}
