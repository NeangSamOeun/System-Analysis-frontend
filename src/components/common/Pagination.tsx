import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (size: number) => void;
}

export default function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  onItemsPerPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 4) pages.push("...");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 3) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between mt-8 gap-4">
      {/* Rows per page */}
      <div className="flex items-center gap-3 bg-white dark:bg-white/5 px-4  border-gray-200 dark:border-white/10">
          <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">Rows:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className="px-3 py-1.5 rounded-full bg-gray-100 dark:bg-white/10
              text-gray-700 dark:text-gray-300 border border-gray-300 w-24
              dark:border-white/10 shadow-inner hover:bg-gray-200 
              dark:hover:bg-white/20 transition font-medium text-sm"
          >
            {[5, 10, 20, 50, 100, 200, 500].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
            <option value={999999}>All</option>
          </select>
        </div>
      {/* Navigation */}
      <div className="flex items-center gap-3">

      {/* Navigation */}
    <div className="flex items-center gap-3 bg-white dark:bg-gray-900 
                    px-5 py-3 border-gray-200 
                    dark:border-gray-700">
        {/* Previous */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center gap-1 px-3 py-2 rounded-full text-sm font-medium
                    bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300
                    hover:bg-gray-200 dark:hover:bg-white/20
                    disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          <ChevronLeft size={16} />
          Previous
        </button>

        {/* Page Numbers */}
        <div className="flex gap-1">
          {getPageNumbers().map((p, i) =>
            p === "..." ? (
              <span key={i} className="px-3 text-gray-400 dark:text-gray-500">…</span>
            ) : (
              <button
                key={i}
                onClick={() => onPageChange(Number(p))}
                className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-semibold
                  ${
                    currentPage === p
                      ? "bg-blue-600 text-white shadow-md scale-105"
                      : "bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20"
                  }
                `}
              >
                {p}
              </button>
            )
          )}
        </div>

        {/* Next */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center gap-1 px-3 py-2 rounded-full text-sm font-medium
                    bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300
                    hover:bg-gray-200 dark:hover:bg-white/20
                    disabled:opacity-40 disabled:cursor-not-allowed transition">
            Next
            <ChevronRight size={16} />
          </button>
      </div>
    </div>
</div>
  );
}
