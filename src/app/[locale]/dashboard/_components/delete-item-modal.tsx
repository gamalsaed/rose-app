'use client';

import { ReactNode, useState, useTransition } from 'react';
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
import { toast } from '@/hooks/use-toast';

// Keys for items that can be deleted
type CommonItemKeys = 'product' | 'category' | 'address' | 'occasion';

type ConfirmDeleteModalProps = {
  itemKey: CommonItemKeys;
  trigger: ReactNode;
  onConfirm: () => Promise<unknown>;
};

//A reusable modal to confirm delete actions
export default function ConfirmDeleteModal({
  trigger,
  itemKey,
  onConfirm,
}: ConfirmDeleteModalProps) {
  // Translations
  const t = useTranslations('common');

  // State
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  // Functions
  const handleConfirm = () => {
    startTransition(async () => {
      try {
        await onConfirm();

        toast({
          variant: 'success',
          description: t('delete-success'),
        });
        setOpen(false);
      } catch (error) {
        toast({
          variant: 'destructive',
          description: (error as Error)?.message || t('delete-error'),
        });
      }
    });
  };
  //  Delete confirmation dialog UI
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[29.625rem] rounded-2xl dark:bg-zinc-800">
        <DialogHeader className="flex flex-col items-center mt-3">
          <div className="w-28 h-28 flex items-center justify-center rounded-full bg-[#2E2E300D]">
            <span className="w-[4.375rem] h-[4.375rem] rounded-full bg-[#2E2E3026] flex items-center justify-center">
              <Trash2 size={29} className="text-[#2E2E30] dark:text-white" />
            </span>
          </div>
          {/* Confirmation message */}
          <DialogTitle className="text-xl font-semibold text-zinc-900 dark:text-white !mt-6 !mb-20 text-center">
            {t('delete-confirmation', { item: t(itemKey) })}
          </DialogTitle>
        </DialogHeader>

        <DialogFooter className="flex gap-4">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="bg-zinc-50 font-medium text-zinc-800 border-zinc-40 capitalize hover:bg-zinc-100 focus-visible:ring-0"
            >
              {t('cancel')}
            </Button>
          </DialogClose>
          {/* Action buttons */}
          <Button
            variant="destructive"
            className="focus-visible:ring-0"
            onClick={handleConfirm}
            disabled={isPending}
          >
            {isPending ? t('deleting') : t('confirm')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/*
  TODO: How to use ConfirmDeleteModal

  - itemKey: The key of the item shown in the confirmation message.
             Must be one of: "product" | "category" | "address" | "occasion"  .
             The actual text will be translated using `common` translations.
  - onConfirm: The delete function.
  - trigger: The element that opens the modal (button, icon, link, etc.).

  Example usage:

<ConfirmDeleteModal
  itemKey="address"
  onConfirm={() => deleteAddress(deletedAddress(id))}
  trigger={
    <Button variant="destructive">
      <Trash2 size={16} /> 
      <span>Delete</span>  
    </Button>
  }
/>
*/
