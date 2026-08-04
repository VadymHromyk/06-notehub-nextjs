import ReactPaginate from "react-paginate";
import css from "@/components/Pagination/Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  setCurrentPage: (selected: number) => void;
  totalPages: number;
}

export default function Pagination({
  currentPage,
  setCurrentPage,
  totalPages,
}: PaginationProps) {
  return (
    <ReactPaginate
      containerClassName={css.pagination}
      activeClassName={css.active}
      breakLabel="..."
      nextLabel=">"
      onPageChange={({ selected }) => setCurrentPage(selected + 1)}
      forcePage={currentPage - 1}
      pageRangeDisplayed={5}
      pageCount={totalPages}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
}
