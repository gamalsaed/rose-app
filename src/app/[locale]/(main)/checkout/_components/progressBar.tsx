'use client';
import * as React from 'react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utilits/cn';

export function ProgressBar({ step = 1 }: { step?: number }) {
  // State
  const [progress, setProgress] = React.useState<number>(0);

  // Effect
  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(step === 2 ? 100 : 33.5), 50);
    return () => clearTimeout(timer);
  }, [step]);

  // Variables
  const STEP_STYLE =
    'w-6 h-6 bg-zinc-200 text-center flex items-center justify-center rounded-full font-semibold text-sm absolute z-10';

  return (
    <div className="relative w-full flex items-center">
      {/* Step 1 */}
      <div
        className={cn(
          STEP_STYLE,
          'left-1/3',
          progress >= 33.5 ? 'bg-maroon-600 text-white' : 'bg-zinc-200'
        )}
      >
        1
      </div>

      {/* Shadcn Progress Bar */}
      <Progress value={progress} className="bg-zinc-200 " />

      {/* Step 2 */}
      <div
        className={cn(
          STEP_STYLE,
          'left-3/4',
          progress > 33.5 ? 'bg-maroon-600 text-white' : 'bg-zinc-200'
        )}
      >
        2
      </div>
    </div>
  );
}
