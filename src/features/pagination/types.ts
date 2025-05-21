export interface IPaginationProps {
  totalPages: number;
  currentPage: number;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
  handlePageClick: (page: number) => void;
}