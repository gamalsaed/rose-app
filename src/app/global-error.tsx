'use client';

import { Button } from '@/components/ui/button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold">Application error</h1>

            <p className="text-red-500">{error.message}</p>
            <Button onClick={reset} variant="destructive">
              Reload
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}
