import React from "react";
type InputWrapperProps = {
  children: React.ReactNode;
  label: string;
  errorMessage?: string | undefined;
};

export default function InputWrapper({
  children,
  label,
  errorMessage,
}: InputWrapperProps) {
  return (
    <div className="w-full">
      <div className="mb-1.5">{label}</div>
      {children}
      <p className="text-red-600 dark:text-red-500 text-sm font-normal mt-1.5">
        {errorMessage && errorMessage !== "register" && errorMessage}
      </p>
    </div>
  );
}
