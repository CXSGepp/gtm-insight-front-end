import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  getExpandedRowModel,
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
  IconButton,
} from "@mui/material";
import Table from "@mui/material/Table";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { usePaginatedQuery } from "../../../hooks/usePaginatedQuery";
import { useTableStore } from "../../../store/useTableStore";
import SkuDetailTable from "../../SkuDetailTable";

const clientColumns: ColumnDef<any>[] = [
  {
    id: "expander",
    header: "Exp",
    cell: ({ row }) =>
      row.getCanExpand() ? (
        <IconButton onClick={row.getToggleExpandedHandler()}>
          {row.getIsExpanded() ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      ) : null,
  },
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

const warehouseColumns: ColumnDef<any>[] = [
  {
    id: "expander",
    header: "Exp",
    cell: ({ row }) =>
      row.getCanExpand() ? (
        <IconButton onClick={row.getToggleExpandedHandler()}>
          {row.getIsExpanded() ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      ) : null,
  },
  { accessorKey: "ID", header: "ID" },
  { accessorKey: "REGION", header: "Región" },
  { accessorKey: "ZONA", header: "Zona" },
  { accessorKey: "LOCALIDAD", header: "Localidad" },
  { accessorKey: "BODEGA", header: "Bodega" },
  { accessorKey: "RUTA", header: "Ruta" },
  { accessorKey: "TIPO_RUTA", header: "Tipo de Ruta" },
  { accessorKey: "CLASIFICACION", header: "Clasificación" },
  { accessorKey: "FRECUENCIA", header: "Frecuencia" },
  { accessorKey: "CLAVE_LISTA", header: "Clave de Lista" },
  { accessorKey: "ACTIVA", header: "Activa" },
];

export default function DataTableETM() {
  const { rows, total, loading, page, limit } = usePaginatedQuery();
  const { filters, setPage, setLimit } = useTableStore();
  const [expanded, setExpanded] = React.useState({});
  
  // Se define el modo: si el filtro viewMode es "WAREHOUSE" se usa warehouseColumns, sino se asume CLIENT.
  const viewMode = filters.viewMode === "WAREHOUSE" ? "WAREHOUSE" : "CLIENT";
  const columns = viewMode === "CLIENT" ? clientColumns : warehouseColumns;
  
  const table = useReactTable({
    data: rows ?? [],
    columns,
    manualPagination: true,
    pageCount: Math.ceil(total / limit) || 1,
    state: {
      pagination: {
        pageIndex: page,
        pageSize: limit,
      },
      expanded, // Estado para las filas expandidas
    },
    onPaginationChange: (updater) => {
      const next = typeof updater === "function"
        ? updater({ pageIndex: page, pageSize: limit })
        : updater;
      setPage(next.pageIndex);
      setLimit(next.pageSize);
    },
    onExpandedChange: setExpanded,
    getRowCanExpand: () => true, // Fuerza la posibilidad de expandir cada fila
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  const isNextDisabled = page >= Math.ceil(total / limit) - 1;
  const isPrevDisabled = page === 0;

  return (
    
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440, overflowY: "auto" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell
                    key={header.id}
                    sx={{
                      fontWeight: "bold",
                      color: "#fff",
                      borderBottom: "1px solid #333",
                    }}
                    align={table.getIsAllColumnsVisible() ? "left" : "center"}
                    style={{ minWidth: header.getSize() }}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length}>Loading...</TableCell>
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
                  </TableRow>
                 
                  {row.getIsExpanded() && (
                    <TableRow>
                      <TableCell colSpan={columns.length} sx={{ p: 0, border: 0 }}>
                        {/* Se pasa BODEGA y, si es modo CLIENT, CLIENTE */}
                        
                        <SkuDetailTable
                          bodega={row.original.BODEGA}
                          cliente={viewMode === "CLIENT" ? row.original.CLIENTE : null}
                        />
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
                labelDisplayedRows={({ from, to, count }) => `${from}–${to} of ${count}`}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Paper>
  );
}
