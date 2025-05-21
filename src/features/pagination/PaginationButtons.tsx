import type { IPaginationProps } from "./types";

const PaginationButtons = ({
  totalPages,
  currentPage,
  handlePreviousPage,
  handleNextPage,
  handlePageClick,
}: IPaginationProps) => {
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "55px", margin: "40px 0" }}>
      <button disabled={currentPage <= 1} onClick={handlePreviousPage}>
        Предыдущая
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          disabled={currentPage === index + 1}
          onClick={() => handlePageClick(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      <button disabled={currentPage >= totalPages} onClick={handleNextPage}>
        Следующая
      </button>
    </div>
  );
};

export default PaginationButtons;
