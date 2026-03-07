'use client';

import { Upload, Image } from 'lucide-react';
import React, { useId, useState } from 'react';
import { Link } from '@/i18n/navigation';

interface InputFileProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'value'
> {
  existingFileUrl: string | undefined;
}
// Uses a unique id per instance so the label correctly triggers this input.
// existingFileUrl: if we got the response back from the backend we put the URL here.

export default function InputFile({
  existingFileUrl,
  onChange,
  id: formFieldId,
  ...props
}: InputFileProps) {
  const [fileName, setFileName] = useState<string>('');
  const fallbackId = useId();
  const inputId = formFieldId ?? fallbackId;
  return (
    <div
      className="flex transition-all duration-200 flex-row-reverse justify-between
      w-full px-4 py-2.5 rounded-md border border-1 hover:border-zinc-400
      dark:hover:border-zinc-500 dark:border-zinc-700
      dark:bg-zinc-700 
      focus-within:border-maroon-600 dark:focus-within:border-softPink-400"
    >
      <input
        type="file"
        className="sr-only"
        accept="image/*"
        id={inputId}
        {...props}
        onChange={e => {
          const file = e.target.files?.[0];
          setFileName(file?.name ?? '');
          onChange?.(e);
        }}
      />

      <label
        htmlFor={inputId}
        className="text-maroon-500 dark:text-softPink-400 flex gap-2 cursor-pointer w-fit text-right"
      >
        <Upload size={20} />
        <span>Upload file</span>
      </label>
      {!existingFileUrl && (
        <div className="text-zinc-800 dark:text-zinc-50">{fileName}</div>
      )}
      {existingFileUrl && (
        <Link href={existingFileUrl} target="_blank">
          <div className="flex gap-2 text-blue-600 dark:text-blue-400">
            <Image href={existingFileUrl} />
            <span>Review current image(s)</span>
          </div>
        </Link>
      )}
    </div>
  );
}
