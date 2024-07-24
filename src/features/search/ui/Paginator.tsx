import React from "react";

import { useStore } from "../model/store";

interface PaginatorProps {
  currentPage: number;
  hasNextPage: boolean;
}

export const Paginator: React.FC<PaginatorProps> = ({
  currentPage,
  hasNextPage,
}) => {
  const { setPage } = useStore();
  const totalPages = hasNextPage ? 10 : currentPage;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div>
      {pages.map(page => (
        <button
          key={page}
          onClick={() => setPage(page)}
          style={{ fontWeight: page === currentPage ? "bold" : "normal" }}
          disabled={page > totalPages}
        >
          {page}
        </button>
      ))}
    </div>
  );
};
