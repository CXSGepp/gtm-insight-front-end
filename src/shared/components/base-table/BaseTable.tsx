import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getExpandedRowModel,
  flexRender,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  CircularProgress,
  IconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { BaseTableProps } from './baseTable.types';

export default function BaseTable<TData>({
  columns,
  data,
  loading = false,
  totalItems = 0,
  pageIndex,
  pageSize,
  onPaginationChange,
  expandableRowContent,
  getRowId,
}: BaseTableProps<TData>) {
  const [expanded, setExpanded] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    manualPagination: true,
    pageCount: Math.ceil(totalItems / pageSize) || 1,
    state: {
      pagination: { pageIndex, pageSize },
      expanded,
    },
    onPaginationChange: (updater) => {
      const next =
        typeof updater === 'function'
          ? updater({ pageIndex, pageSize })
          : updater;
      onPaginationChange(next.pageIndex, next.pageSize);
    },
    onExpandedChange: setExpanded,
    getRowCanExpand: () => !!expandableRowContent,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: expandableRowContent ? getExpandedRowModel() : undefined,
    getRowId: getRowId ? getRowId : (row: any) => row.id, // We can later refine any if needed
  });

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader size="small">
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  No data found
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <React.Fragment key={row.id}>
                  <TableRow>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                    {expandableRowContent && (
                      <TableCell padding="checkbox">
                        <IconButton size="small" onClick={row.getToggleExpandedHandler()}>
                          {row.getIsExpanded() ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </IconButton>
                      </TableCell>
                    )}
                  </TableRow>

                  {row.getIsExpanded() && expandableRowContent && (
                    <TableRow>
                      <TableCell colSpan={columns.length + 1} sx={{ p: 0 }}>
                        {expandableRowContent(row.original)}
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))
            )}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                component="div"
                count={totalItems}
                rowsPerPage={pageSize}
                page={pageIndex}
                onPageChange={(_, newPage) => onPaginationChange(newPage, pageSize)}
                onRowsPerPageChange={(e) => onPaginationChange(0, Number(e.target.value))}
                labelRowsPerPage="Rows per page"
                labelDisplayedRows={({ from, to, count }) => `${from}-${to} of ${count}`}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Paper>
  );
}
