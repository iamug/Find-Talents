import React from "react";
import { Pagination as BPagination } from "react-bootstrap";

interface IPaginationProps {
  data: any[];
  page: number;
  limit: number;
  setPage(nuumber: number): void;
}

interface IPaginationNextProps {
  data: any[];
  next: string;
  limit: number;
  setNext(next: string): void;
}

export const Pagination = ({ data, page, limit, setPage }: IPaginationProps) => {
  const TOTAL_RECORDS = 50;
  const TOTAL_PAGES = Math.floor(+TOTAL_RECORDS / +limit);
  return (
    <>
      {data.length > 0 && (
        <BPagination className="mx-auto">
          {page !== 1 && (
            <>
              {page !== 1 && <BPagination.First onClick={() => setPage(1)} />}
              <BPagination.Prev onClick={() => setPage(+page - 1)} />
            </>
          )}
          {Array.from(Array(TOTAL_PAGES || 0).keys()).map((index) => (
            <BPagination.Item
              key={Math.floor(Math.random() * (90000 + +index)) + 10000}
              onClick={() => setPage(+index + 1)}
              active={+index + 1 === page}
            >
              {index + 1}
            </BPagination.Item>
          ))}

          {TOTAL_PAGES !== page && (
            <>
              <BPagination.Next onClick={() => setPage(+page + 1)} />
              {TOTAL_PAGES !== page && <BPagination.Last onClick={() => setPage(TOTAL_PAGES || 1)} />}
            </>
          )}
        </BPagination>
      )}
      {/* <pre>{JSON.stringify({ meta, page }, null, 2)}</pre> */}
    </>
  );
};

export const PaginationNext = ({ data, next, limit, setNext }: IPaginationNextProps) => {
  return (
    <>
      {data.length > 0 && (
        <BPagination className="mx-auto">
          <BPagination.Next onClick={() => setNext(next)}>Next</BPagination.Next>
        </BPagination>
      )}
      {/* <pre>{JSON.stringify({ meta, page }, null, 2)}</pre> */}
    </>
  );
};
