"use client";

import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter } from 'next/navigation';

const PaginationComponent = ({ page, hasPrev, hasNext }) => {
  const router = useRouter();

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious 
            disabled={!hasPrev} 
            onClick={() => hasPrev && router.push(`?page=${page - 1}`)}
          >
            Previous
          </PaginationPrevious>
        </PaginationItem>

        {/* Page Numbers */}
        <PaginationItem>
          <PaginationLink 
            href={`?page=1`} 
            className={page === 1 ? 'active' : ''}>
              1
          </PaginationLink>
        </PaginationItem>

        {page > 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {page > 1 && (
          <PaginationItem>
            <PaginationLink 
              href={`?page=${page}`} 
              className="active">
                {page}
            </PaginationLink>
          </PaginationItem>
        )}

        {hasNext && (
          <PaginationItem>
            <PaginationLink href={`?page=${page + 1}`}>
              {page + 1}
            </PaginationLink>
          </PaginationItem>
        )}

        {hasNext && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext 
            disabled={!hasNext} 
            onClick={() => hasNext && router.push(`?page=${page + 1}`)}
          >
            Next
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
