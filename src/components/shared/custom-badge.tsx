import React from "react";

export default function CustomBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-maroon-600 text-xs inline-block bg-maroon-50 px-2 py-1 font-medium  rounded-full">
      {children}
    </span>
  );
}
