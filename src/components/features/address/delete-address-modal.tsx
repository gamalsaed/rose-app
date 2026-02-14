'use client';

import { useTransition } from 'react';
import { useTranslations } from 'next-intl';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { deleteAddress } from '@/lib/services/address.service';
import { toast } from '@/hooks/use-toast';

export default function DeleteAddressModal({ id }: { id: string }) {
   // Translation
  const t = useTranslations('address');

  // State
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteAddress(id);
        toast({
          variant: 'success',
          description: t('delete-success'),
        });
      } catch (error) {
        toast({
          variant: 'destructive',
          description:
            (error as Error)?.message || t('delete-error'),
        });
      }
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-white w-9 h-9 flex items-center justify-center rounded-full bg-red-600">
          <Trash2 size={16} />
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[29.625rem] rounded-2xl">
        <DialogHeader className="flex flex-col items-center mt-3">
          <button className="w-28 h-28 flex items-center justify-center rounded-full bg-[#2E2E300D]">
            <span className="w-[4.375rem] h-[4.375rem] rounded-full bg-[#2E2E3026] flex items-center justify-center">
              <Trash2 size={29} color="#2E2E30" />
            </span>
          </button>

          <DialogTitle className="text-xl font-semibold text-zinc-900 dark:text-white !mt-6 !mb-20 text-center">
            {t('delete-confirmation')}
          </DialogTitle>
        </DialogHeader>

        <DialogFooter className='flex gap-4'>
          <DialogClose asChild>
            <Button
              variant="outline"
              className="bg-zinc-50 font-medium text-zinc-800 border-zinc-40 capitalize hover:bg-zinc-100"
            >
              {t('cancel')}
            </Button>
          </DialogClose>

          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? t('deleting') : t('delete')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
