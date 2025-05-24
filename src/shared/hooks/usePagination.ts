import { useState } from "react";

interface UsePaginationProps {
  initialPage: number;
  onPageChange?: (page: number) => void;
}

interface UsePaginationReturn {
  currentPage: number;
  handlePageClick: (page: number) => void;
  handlePreviousPageClick: () => void;
  handleNextPageClick: () => void;
}

function usePagination ({
  initialPage = 1,
  onPageChange,
}: UsePaginationProps): UsePaginationReturn {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    if (onPageChange) onPageChange(page);
  };

  const handlePreviousPageClick = () => {
    const newPage = currentPage - 1;
    setCurrentPage(newPage);
    if (onPageChange) onPageChange(newPage);
  };

  const handleNextPageClick = () => {
    const newPage = currentPage + 1;
    setCurrentPage(newPage);
    if (onPageChange) onPageChange(newPage);
  };

  return {
    currentPage,
    handlePageClick,
    handlePreviousPageClick,
    handleNextPageClick
  };
};

export default usePagination;
