import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
} from "@mui/material";
import { usePaginatedQuery } from "../../../hooks/usePaginatedQuery";
import { useTableStore } from "../../../store/useTableStore";

const columns: ColumnDef<any>[] = [
  { accessorKey: "ID", header: "ID" },
  { accessorKey: "REGION", header: "Región" },
  { accessorKey: "ZONA", header: "Zona" },
  { accessorKey: "LOCALIDAD", header: "Localidad" },
  { accessorKey: "BODEGA", header: "Bodega" },
  { accessorKey: "RUTA", header: "Ruta" },
  { accessorKey: "CLIENTE", header: "Cliente" },
  { accessorKey: "NOMBRE", header: "Nombre" },
  { accessorKey: "TIPO_RUTA", header: "Tipo de Ruta" },
  { accessorKey: "CLASIFICACION", header: "Clasificación" },
  { accessorKey: "FRECUENCIA", header: "Frecuencia" },
  { accessorKey: "CLAVE_LISTA", header: "Clave de Lista" },
  { accessorKey: "ACTIVA", header: "Activa" },
  { accessorKey: "TELEFONO", header: "Teléfono" },
  { accessorKey: "DIRECCION", header: "Dirección" },
];

export default function DataTableETM() {
  const { rows, total, loading, page, limit } = usePaginatedQuery();
  const { setPage, setLimit } = useTableStore();

  // TanStack Table: manual pagination

  const table = useReactTable({
    data: rows ?? [],
    columns,
    manualPagination: true, // we do server side
    pageCount: Math.ceil(total / limit) || 1, // total pages
    state: {
      pagination: {
        pageIndex: page,    // 0-based current page
        pageSize: limit,    // e.g. 5, 10, 25
      },
    },
    onPaginationChange: (updater) => {
      const next = typeof updater === "function"
        ? updater({ pageIndex: page, pageSize: limit })
        : updater;

      setPage(next.pageIndex);
      setLimit(next.pageSize);
    },
    getCoreRowModel: getCoreRowModel(),
  });

  const isNextDisabled = page >= Math.ceil(total / limit ) -1
  const isPrevDisabled = page === 0;


  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer>
        <table>
          <TableHead>
            <TableRow>
              {table.getHeaderGroups().map((headerGroup) =>
                headerGroup.headers.map((header) => (
                  <TableCell key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableCell>
                ))
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length}>Loading...</TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                count={total}
                rowsPerPage={limit}
                page={page}
                onPageChange={(_event, newPage) => setPage(newPage)} 
                onRowsPerPageChange={(event) => {
                  setLimit(Number(event.target.value)); 
                  setPage(0); 
                }}
                slotProps={{
                  actions: {
                    nextButton: { disabled: isNextDisabled },
                    previousButton: { disabled: isPrevDisabled },
                  },
                }}
                labelRowsPerPage="Rows per page"
                labelDisplayedRows={({ from, to, count }) =>
                  `${from}–${to} of ${count}`
                }
              />
            </TableRow>
          </TableFooter>
        </table>
      </TableContainer>
    </Paper>
  );
}