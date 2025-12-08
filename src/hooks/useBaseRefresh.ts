import { useState } from "react";

export default function useBaseRefresh(defaultPageSize = 10) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(defaultPageSize);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Reset everything
  const refresh = (callback?: () => void) => {
    setLoading(true);
    setSearch("");
    setCurrentPage(1);
    setItemsPerPage(defaultPageSize);

    // delay to allow UI updates before loading
    setTimeout(() => {
      callback && callback(); // call page load function
    }, 30);
  };

  return {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    search,
    setSearch,
    loading,
    setLoading,
    refresh
  };
}
