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
    <div className="flex h-screen w-screen">
      {/* Left */}
      <div className="flex w-1/2 max-md:w-full items-center justify-center">
        <div className="flex flex-col items-center relative">
          <div className="absolute -top-20 rtl:left-0 ltr:right-0 ">
            <LanguageSwitcher />
          </div>
          <div className={cn(SeparatorClass)} />
          {children}
          <div className={cn(SeparatorClass, "rotate-180")} />
        </div>
      </div>

      {/* Right */}
      <div className="relative max-md:hidden w-1/2">
        <Image
          src="/assets/images/auth/authside.svg"
          alt="side Image"
          fill
          className="object-cover "
          priority
        />
      </div>
    </div>
  );
}
