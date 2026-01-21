"use client";

import { cn } from "@/lib/utilits/cn";
import { Button } from "../ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

// Define Props Interface
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  direction?: "ltr" | "rtl";
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  direction = "ltr",
  className,
}: PaginationProps) {
  // to set the direction to rtl
  const isRtl = direction === "rtl";
  const getpage = () => {
    // to set the page numbers to be displayed
    const page: (number | string)[] = [];
    // delta is the number of pages to show before and after current page
    const delta = 2;
    for (let i = 1; i <= totalPages; i++) {
      if (
        i == 1 || //do not display any thing before page one
        i == totalPages || //do not display any thing after last page
        (i >= currentPage - delta && i <= currentPage + delta) //display pages around current page dy the delta value (2)
      ) {
        page.push(i);
      } else if (
        i == currentPage - delta - 1 || //to display ... before the current page
        i == currentPage + delta + 1 //to display ... after the current page
      ) {
        page.push("...");
      }
    }
    // return page.filter((item, pos, self) => self.indexOf(item) === pos);
    return page;
  };
  const pages = getpage();

  // icon functionality based on direction
  const PrevIcon = isRtl ? ChevronRight : ChevronLeft;
  const NextIcon = isRtl ? ChevronLeft : ChevronRight;
  const FirstIcon = isRtl ? ChevronsRight : ChevronsLeft;
  const LastIcon = isRtl ? ChevronsLeft : ChevronsRight;

  // reusable class
  const baseBtnStyles = cn(
    "h-9 w-9 rounded-lg ",
    "bg-zinc-100 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-50",
    "hover:bg-zinc-100 dark:hover:bg-zinc-700", //to remove the hover effect
    " disabled:bg-zinc-100 dark:disabled:bg-zinc-700", //to remove the disable effet from background
    " disabled:text-zinc-800 dark:disabled:text-zinc-50", //to remove the disable effect from the text
  );

  // Render Pagination Component
  return (
    <nav
      dir={direction}
      className={cn(
        "flex gap-2 items-center justify-center md:gap-2",
        className,
      )}
    >
      {/* first page button (chevrons) */}
      <Button
        disabled={currentPage === 1}
        onClick={() => onPageChange(1)}
        size="icon"
        className={baseBtnStyles}
      >
        <FirstIcon />
      </Button>
      {/* previous page (chevron)*/}
      <Button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        size="icon"
        className={baseBtnStyles}
      >
        <PrevIcon />
      </Button>

      {pages.map((page, index) => (
        <span key={index}>
          {page === "..." ? (
            <button className={baseBtnStyles}>...</button>
          ) : (
            <Button
              className={cn(
                page === currentPage
                  ? "bg-maroon-600 dark:bg-softPink-300 dark:text-zinc-700 hover:bg-maroon-600 dark:hover:bg-softPink-300"
                  : baseBtnStyles,
              )}
              onClick={() => onPageChange(page as number)}
            >
              {page}
            </Button>
          )}
        </span>
      ))}

      {/* next page (chevron)*/}
      <Button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        size="icon"
        className={baseBtnStyles}
      >
        <NextIcon />
      </Button>
      {/* last page button (chevrons) */}
      <Button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(totalPages)}
        size="icon"
        className={baseBtnStyles}
      >
        <LastIcon />
      </Button>
    </nav>
  );
}
