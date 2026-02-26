'use client';

import { useTranslations } from 'next-intl';
import { useDeleteAccount } from '@/hooks/profile/use-delete-account';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ErrorBox } from '@/components/shared/error-box';

import { Trash } from 'lucide-react';

export function DeleteAccountPopup() {
  // Translation
  const t = useTranslations('profile');

  // Mutations
  const { deleteAccount, isPending, error } = useDeleteAccount();

  // Functions
  const handleDeleteAccount = () => {
    deleteAccount();
  };

  return (
    <Dialog>
      {/* Delete Account Button */}
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          className="text-base text-maroon-500"
          onClick={() => {}}
        >
          {t('delete-account')}
        </Button>
      </DialogTrigger>

      {/* Delete Account Popup */}
      <DialogContent className="sm:max-w-md">
        {/* Modal Header */}
        <DialogHeader>
          <div className="flex flex-col items-center justify-center text-center">
            <div className="flex items-center justify-center w-[6.5625rem] h-[6.5625rem] rounded-full bg-gray-800/5 mt-12 mb-7">
              <div className="flex items-center justify-center w-[4.375rem] h-[4.375rem] rounded-full bg-gray-800/15">
                <Trash className="size-7 text-gray-700" />
              </div>
            </div>

            <DialogTitle>{t('delete-account-popup-title')}</DialogTitle>

            <DialogDescription className="text-base text-maroon-500 mt-1.5 mb-11">
              {t('delete-account-popup-description')}
            </DialogDescription>
          </div>
        </DialogHeader>

        <DialogFooter>
          {/* Cancel Button */}
          <div className="flex flex-col gap-6 w-full">
            {/* Error Box */}
            {error && <ErrorBox error={error.message} />}

            {/* Actions */}
            <div className="flex gap-2.5 w-full">
              {/* Cancel Button */}
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  {t('delete-account-popup-nope')}
                </Button>
              </DialogClose>

              {/* Submit Button */}
              <Button
                type="button"
                loading={isPending}
                onClick={handleDeleteAccount}
              >
                {t('delete-account-popup-yes')}
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
