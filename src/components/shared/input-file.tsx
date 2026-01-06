"use client";
import { Upload, Image } from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";
interface InputFileProps extends React.InputHTMLAttributes<HTMLInputElement> {
  existingFileUrl?: string;
}

export default function InputFile({
  existingFileUrl,
  ...props
}: InputFileProps) {
  const [fileName, setFileName] = useState<string>("");
  return (
    <div
      className="
        flex flex-row-reverse justify-between
        w-full px-4 py-2.5 rounded-md
        ring-1 ring-inset ring-input
        hover:ring-zinc-400
        focus-within:ring-2 focus-within:ring-maroon-600
        dark:ring-zinc-600
        dark:hover:ring-zinc-500
        dark:focus-within:ring-softPink-400
      "
    >
      <input
        type="file"
        className="sr-only"
        accept="image/*"
        {...props}
        onChange={(e) => {
          const file = e.target.files?.[0];
          setFileName(file?.name ?? "");
          props.onChange?.(e);
        }}
      />

      <label
        htmlFor={props.id}
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
            <Image />
            <span>Review current image(s)</span>
          </div>
        </Link>
      )}
    </div>
  );
}
