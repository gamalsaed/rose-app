"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
interface NavLinkProps {
  children: React.ReactNode;
  path: string;
}
export default function NavLink({ children, path }: NavLinkProps) {
  const pathname = usePathname();
  return (
    <li>
      <Link
        href={path}
        className={`w-fit flex gap-2 py-4 px-3 text-zinc-50 dark:text-maroon-800 hover:text-softPink-200 transition-colors duration-150  ${
          pathname.split("/")[1] === path.split("/")[1] &&
          " border-b-4 border-softPink-200 text-softPink-200 dark:border-maroon-800"
        } `}
      >
        {children}
      </Link>
    </li>
  );
}
