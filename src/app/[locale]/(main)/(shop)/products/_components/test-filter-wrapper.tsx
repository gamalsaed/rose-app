'use client';
import type { ProductFilters } from '@/lib/apis/products.api';

type Props = {
  filters: ProductFilters;// pass current filters from wrapper
  onChange: (filters: ProductFilters) => void;
};

/**
 * Test filter component for experimenting with product filters
 */
export default function TestFilterWrapper({ filters, onChange }: Props) {
  return (
    <div className="flex flex-col gap-3">
      {/* filter by category */}
      <button
        onClick={() =>
          onChange({ ...filters, category: '673c46fd1159920171827c85' }) 
        }
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Category 1
      </button>
      {/*clear category but keep others */}
      <button
        onClick={() => onChange({ ...filters, category: undefined })} 
        className="px-4 py-2 bg-gray-200 rounded"
      >
        All
      </button>
      
    </div>
  );
}
