import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { ChevronLeft, ChevronRight } from "react-feather";

function getPager(totalPages, currentPage = 1) {
  if (totalPages !== undefined && totalPages !== null && totalPages !== 0) {
    // ensure current page isn't out of range
    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    let startPage, endPage;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    // create an array of pages to ng-repeat in the pager control
    const pages = Array.from(Array(endPage + 1 - startPage).keys()).map(
      (i) => startPage + i
    );

    // return object with all pager properties required by the view
    return {
      currentPage: currentPage,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      pages: pages,
    };
  }
}

const Paginations = (props) => {
  const { page, totalPages, onPageChange } = props;
  const { pages, endPage, currentPage } = getPager(totalPages, page);
  if (totalPages <= 1) return null;
  return (
    <Pagination className="d-flex justify-content-end mt-1">
      <PaginationItem disabled={page === 1}>
        <PaginationLink first onClick={() => onPageChange(page - 1)}>
          <ChevronLeft />
        </PaginationLink>
      </PaginationItem>
      {pages.map((page, index) => {
        return (
          <PaginationItem
            key={index}
            onClick={() => onPageChange(page)}
            active={page === currentPage}
          >
            <PaginationLink>{page}</PaginationLink>
          </PaginationItem>
        );
      })}
      <PaginationItem disabled={page === endPage}>
        <PaginationLink last onClick={() => onPageChange(page + 1)}>
          <ChevronRight />
        </PaginationLink>
      </PaginationItem>
    </Pagination>
  );
};
export default Paginations;
