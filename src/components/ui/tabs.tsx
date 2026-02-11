'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utilits/cn';

const tabsTriggerVariants = cva(
  'inline-flex w-full h-full data-[state=active]:w-[100% + 2px] items-center justify-center  whitespace-nowrap rounded-lg px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=inactive]:ring-zinc-300 data-[state-inactive]:dark:ring-zinc-600 data-[state=active]:z-10 data-[state=inactive]:text-zinc-800',
  {
    variants: {
      variant: {
        default:
          'ring-2  data-[state=active]:bg-maroon-600 data-[state=active]:ring-maroon-600 data-[state=active]:text-white  data-[state=inactive]:bg-zinc-50 dark:data-[state=active]:bg-softPink-300 dark:data-[state=active]:ring-softPink-300 dark:data-[state=active]:text-zinc-800 dark:data-[state=inactive]:bg-zinc-700 dark:data-[state=inactive]:ring-zinc-600 dark:data-[state=inactive]:text-zinc-50',
        destructive:
          'ring-2 data-[state=active]:text-white data-[state=active]:bg-maroon-700 data-[state=active]:ring-maroon-700 dark:data-[state=active]:bg-softPink-400 dark:data-[state=active]:ring-softPink-400  dark:data-[state=active]:text-zinc-800 dark:data-[state=inactive]:bg-zinc-700 dark:data-[state=inactive]:ring-zinc-600 dark:data-[state=inactive]:text-zinc-50',
        outline:
          'data-[state=active]:bg-maroon-600 border border-2 data-[state=active]:border-10 data-[state=active]:text-white data-[state=inactive]:z-20 data-[state=inactive]:bg-zinc-50 data-[state=inactive]:border-zinc-300 data-[state=active]:ring data-[state=active]:border-none data-[state=active]:ring-maroon-500/50 dark:data-[state=active]:bg-softPink-300 dark:data-[state=active]:ring-softPink-300/50 dark:data-[state=inactive]:bg-zinc-700 dark:data-[state=inactive]:border-zinc-600 dark:data-[state=inactive]:text-zinc-50 dark:data-[state=active]:text-zinc-800',
        ghost:
          'ring-2 data-[state=active]:bg-zinc-300 dark:data-[state=active]:text-zinc-300 data-[state=active]:ring-zinc-300 dark:data-[state=active]:bg-zinc-500 dark:data-[state=active]:ring-zinc-500 data-[state=active]:text-zinc-800 dark:data-[state=inactive]:text-zinc-500 dark:data-[state=inactive]:ring-zinc-600 text-zinc-800',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'inline-flex w-full m-0  h-11 items-center justify-center rounded-lg bg-muted  text-muted-foreground',
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> &
    VariantProps<typeof tabsTriggerVariants> & {
      direction?: 'left' | 'right';
    }
>(({ className, direction, variant = 'default', ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      tabsTriggerVariants({ variant, className }),
      direction === 'left'
        ? 'data-[state=inactive]:border-r-0'
        : 'data-[state=inactive]:border-l-0'
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
