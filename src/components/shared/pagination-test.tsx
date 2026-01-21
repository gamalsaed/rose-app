"use client";

import { useState } from "react";
import PaginationComponent from "./pagination";
import PassInput from "./pass-input";

export default function PaginationTest() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  return (
    <div>
      <div className="text-center mb-6">
        <h3 className="text-2xl dark:text-white">
          Pagination and passinput Component Test
        </h3>
        <p className="text-2xl dark:text-white">
          Active Page: <span className="text-red-800">{currentPage}</span>
        </p>
      </div>

      <PaginationComponent
        className="mb-6"
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
      <PassInput />
    </div>
  );
}
