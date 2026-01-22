import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utilits/cn";
import { LanguageSwitcher } from "@/components/shared/language-switcher";
export default function Layout({ children }: { children: React.ReactNode }) {
  const SeparatorClass = `
    bg-[url('/assets/images/auth/separator-light.svg')]
    dark:bg-[url('/assets/images/auth/separator-dark.svg')]
    bg-cover bg-center max-w-72 w-72 h-11
    `;

  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2">
      {/* Left */}
      <div className="flex justify-center py-10">
        <div className="w-full max-w-md my-auto ">
          <div className="w-full flex flex-col items-center">
            {/* Language */}
            <div className="w-full rtl:text-left ltr:text-right">
              <LanguageSwitcher />
            </div>

            <div className={cn(SeparatorClass, "mb-8")} />

            {children}

            <div className={cn(SeparatorClass, "rotate-180 mt-8")} />
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="relative hidden lg:block">
        <Image
          src="/assets/images/auth/authside.svg"
          alt="side Image"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
