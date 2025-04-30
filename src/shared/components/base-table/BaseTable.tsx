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
  Collapse,
  Box,
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

  const safeData = (data ?? []) as TData[];
  const safeTotalItems = isFinite(totalItems) ? totalItems : 0;
  const safePageSize = pageSize > 0 ? pageSize : 50;

  const table = useReactTable({
    data: safeData,
    columns,
    manualPagination: true,
    pageCount: Math.ceil(safeTotalItems / safePageSize) || 1,
    state: {
      pagination: { pageIndex, pageSize: safePageSize },
      expanded,
    },
    onPaginationChange: (updater) => {
      const next =
        typeof updater === 'function'
          ? updater({ pageIndex, pageSize: safePageSize })
          : updater;
      onPaginationChange(next.pageIndex, next.pageSize);
    },
    onExpandedChange: setExpanded,
    getRowCanExpand: () => !!expandableRowContent,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: expandableRowContent ? getExpandedRowModel() : undefined,
    getRowId: getRowId ? getRowId : (row: any) => row.ID,
  });

  return (
    <Paper sx={{ width: '100%', overflow: 'auto' }}> {/* Cambiado de 'hidden' a 'auto' para scroll */}
      <TableContainer sx={{ maxHeight: 600, overflowX: 'auto' }}> {/* Scroll horizontal agregado */}
        <Table stickyHeader size="small">
          <TableHead>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((h) => (
                  <TableCell key={h.id}>
                    {flexRender(h.column.columnDef.header, h.getContext())}
                  </TableCell>
                ))}
                {expandableRowContent ? <TableCell /> : null}
              </TableRow>
            ))}
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length + 1} align="center">
                  <CircularProgress size={24} />
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length + 1} align="center">
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

                  {expandableRowContent && (
                    <TableRow>
                      <TableCell colSpan={columns.length + 1} sx={{ p: 0 }}>
                        <Collapse in={row.getIsExpanded()} timeout="auto" unmountOnExit>
                          <Box sx={{ p: 2, bgcolor: '#f9f9f9', borderTop: '1px solid #e0e0e0' }}>
                            {expandableRowContent(row.original)}
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))
            )}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={columns.length + (expandableRowContent ? 1 : 0)}>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, 50, 100]}
                  component="div"
                  count={safeTotalItems}
                  rowsPerPage={safePageSize}
                  page={pageIndex}
                  onPageChange={(_, newPage) => onPaginationChange(newPage, safePageSize)}
                  onRowsPerPageChange={(e) => onPaginationChange(0, Number(e.target.value))}
                  labelRowsPerPage="Filas por página"
                  labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
                />
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Paper>
  );
}
