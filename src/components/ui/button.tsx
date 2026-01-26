import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utilits/cn';

const buttonVariants = cva(
  'inline-flex w-full  items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'text-white bg-maroon-600 hover:bg-maroon-700 disabled:bg-zinc-300 disabled:text-zinc-500 dark:bg-softPink-300 dark:hover:bg-softPink-400 dark:text-zinc-800 dark:disabled:bg-zinc-700 dark:disabled:text-zinc-600',
        destructive:
          'text-white dark:text-zinc-50 bg-red-600 hover:bg-red-700 disabled:bg-zinc-300 disabled:text-zinc-500 dark:bg-red-500 dark:hover:bg-red-600 dark:disabled:bg-zinc-700 dark:disabled:text-zinc-600',
        outline:
          'border border-maroon-600 text-maroon-600 hover:bg-softPink-50 disabled:text-zinc-400 disabled:border-zinc-300 disabled:bg-zinc-100 dark:text-softPink-300 dark:border-softPink-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:disabled:bg-zinc-800 dark:disabled:border-zinc-600 dark:disabled:text-zinc-600',
        secondary:
          'text-maroon-600 bg-maroon-50 hover:bg-maroon-100 disabled:bg-zinc-300 disabled:text-zinc-500 dark:disabled:bg-zinc-700 dark:disabled:text-zinc-600 dark:text-softPink-300 dark:bg-zinc-700 dark:hover:bg-zinc-600',
        ghost:
          'w-fit !px-0 !py-0 hover:bg-zinc-100 disabled:text-zinc-400 disabled:bg-zinc-100 dark:hover:bg-zinc-700 dark:disabled:bg-zinc-700 dark:disabled:text-zinc-600 dark:text-zinc-50 hover:bg-transparent focus-visible:outline-none focus-visible:ring-0',
        link: 'border text-zinc-800 bg-zinc-50 border-zinc-400 hover:bg-zinc-100 disabled:border-zinc-300 disabled:text-zinc-400 disabled:bg-zinc-100 dark:bg-zinc-800 dark:border-zinc-500 dark:text-zinc-50 dark:hover:bg-zinc-700 dark:disabled:bg-zinc-800 dark:disabled:border-zinc-600 dark:disabled:text-zinc-600',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & { loading?: boolean }
>(
  (
    { className, variant, loading, size, children, asChild = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
        disabled={props.disabled || loading}
      >
        <div className="flex items-center gap-1.5">
          <span className="flex items-center gap-1">{children}</span>
          {loading && <Spinner className="!size-[18px]" />}
        </div>
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
