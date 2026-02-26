'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';

import { useUploadProfilePhoto } from '@/hooks/profile/use-upload-profile-photo';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

import { CloudUpload } from 'lucide-react';

type ProfileAvatarUploaderProps = {
  initialUrl?: string;
  fallbackText?: string;
};

export function UploadProfilePhoto({
  initialUrl,
  fallbackText = 'ME',
}: ProfileAvatarUploaderProps) {
  // Translation
  const t = useTranslations('profile');

  // States
  const [previewUrl, setPreviewUrl] = React.useState<string | undefined>(
    initialUrl
  );
  const [isUploading, setIsUploading] = React.useState(false);

  // Refs
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  // Clean up object URLs to avoid memory leaks
  React.useEffect(() => {
    return () => {
      // only revoke if it's an object URL we created
      if (previewUrl?.startsWith('blob:')) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  // Mutations
  const { uploadProfilePhoto } = useUploadProfilePhoto();

  // Functions
  const openFilePicker = () => inputRef.current?.click();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset input so selecting the same file again triggers onChange
    e.target.value = '';

    // Basic validation (tweak as you like)
    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowed.includes(file.type)) {
      alert('Please upload a JPG, PNG, or WEBP image.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('Max file size is 5MB.');
      return;
    }

    // Instant preview
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    // Optional upload

    try {
      setIsUploading(true);
      await handleOnUpload(file);
    } finally {
      setIsUploading(false);
    }
  };

  const handleOnUpload = async (file: File) => {
    const formData = new FormData();

    formData.append('photo', file);

    await uploadProfilePhoto(formData);
  };

  return (
    <div className="inline-flex items-center gap-4">
      <div className="relative">
        {/* Clickable Avatar */}
        <div className="rounded-full focus:outline-none ">
          <Avatar className="h-28 w-28">
            <AvatarImage
              src={previewUrl}
              alt={t('profile-avatar-alt')}
              className="object-cover"
            />
            <AvatarFallback className="text-3xl font-semibold">
              {fallbackText}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Small camera button overlay (like your screenshot) */}
        <Button
          type="button"
          size="icon"
          variant="outline"
          onClick={openFilePicker}
          disabled={isUploading}
          className="absolute bottom-0 end-0 h-8 w-8 rounded-full shadow border-zinc-200 bg-zinc-50 text-zinc-800 hover:bg-zinc-50 focus:outline-none focus:ring-0 focus:ring-offset-0"
          aria-label="Upload new photo"
        >
          <CloudUpload className="h-8 w-8" />
        </Button>

        {/* Hidden file input */}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* Upload Photo Description */}
      <div className="">
        <p className="text-xl font-semibold mb-3">{t('upload-photo')}</p>
        <p className="text-zinc-500">{t('upload-photo-description')}</p>
      </div>
    </div>
  );
}
