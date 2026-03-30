import React from 'react';
import { Skeleton } from '../ui/skeleton';

export default function loader() {
  return (
    <div className="fixed inset-0 z-50 bg-background p-6 space-y-4">
      <Skeleton className="h-8 w-1/3" />
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-64 w-full" />
    </div>
  );
}
