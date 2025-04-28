import React from 'react';
import { TablePagination } from '@mui/material';

interface PaginationProps {
  page: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export default function Pagination({
  page,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) {
  return (
    <TablePagination
      component="div"
      count={totalItems}
      page={page}
      onPageChange={(_, newPage) => onPageChange(newPage)}
      rowsPerPage={pageSize}
      onRowsPerPageChange={(e) => onPageSizeChange(Number(e.target.value))}
      rowsPerPageOptions={[5, 10, 25, 50, 100]}
      labelRowsPerPage="Rows per page"
    />
  );
}
