// SkuDetailTable.tsx
import React, { useState, useEffect } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  Chip,
} from "@mui/material";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  getPaginationRowModel,
} from "@tanstack/react-table";
// import { fetchSkusForRow } from "../api/fetchSkusForRow"; // Ya no se usa para demo
import { useTableStore } from "../store/useTableStore";

const renderChip = (value: number) => (
  <Chip
    label={value === 1 ? "Active" : "Inactive"}
    variant="outlined"
    size="small"
    color={value === 1 ? "success" : "error"}

  />
);

const renderChipGlobal = (value: string) => {
  // Convertir a minúsculas para comparar sin problemas
  const state = value.toLowerCase();
  let label = value;
  let color: "success" | "error" | "warning" | "default" = "default";

  switch (state) {
    case "verde":
      label = "Active";
      color = "success";
      break;
    case "rojo":
      label = "Inactive";
      color = "error";
      break;
    case "amarillo":
      label = "Warning";
      color = "warning";
      break;
    default:
      label = value;
      color = "default";
  }

  return (
    <Chip
      label={label}
      variant="outlined"
      size="small"
      color={color === "default" ? undefined : color}
    />
  );
};
const skuColumns: ColumnDef<any>[] = [
  { accessorKey: "ID_PRODUCTO" },
  { accessorKey: "DESCRIPCION" },
  {
    accessorKey: "ACTIVO_OPM",
    header: "Activo OPM",
    cell: ({ cell }) => renderChip(cell.getValue<number>()),
  },
  {
    accessorKey: "ACTIVO_SIO",
    header: "Activo SIO",
    cell: ({ cell }) => renderChip(cell.getValue<number>()),
  },
  {
    accessorKey: "ACTIVO_HH",
    header: "Activo HH",
    cell: ({ cell }) => renderChip(cell.getValue<number>()),
  },
  {
    accessorKey: "CANAL",
    header: "Canal",
    cell: ({ cell }) => renderChip(cell.getValue<number>()),
  },
  { accessorKey: "DATABASE", header: "Database" },
  { accessorKey: "SEMAFORO_GLOBAL", header: "Semáforo Global",
    cell: ({ cell }) => renderChipGlobal(cell.getValue<string>()),
   },
  
];

interface SkuDetailTableProps {
  bodega: number;
  cliente?: number;
}

const dummyData = [
  {
    ID_PRODUCTO: 3370,
    DESCRIPCION: "seven up six",
    ACTIVO_OPM: 1,
    ACTIVO_SIO: 0,
    ACTIVO_HH: 1,
    CANAL: 2,
    DATABASE: "Refresco",
    SEMAFORO_GLOBAL: "VERDE",
  },
  {
    ID_PRODUCTO: 8890,
    DESCRIPCION: "seven up six",
    ACTIVO_OPM: 0,
    ACTIVO_SIO: 1,
    ACTIVO_HH: 0,
    CANAL: 1,
    DATABASE: "Refresco",
    SEMAFORO_GLOBAL: "ROJO",
  },
  {
    ID_PRODUCTO: 3340,
    DESCRIPCION: "seven up six",
    ACTIVO_OPM: 1,
    ACTIVO_SIO: 1,
    ACTIVO_HH: 1,
    CANAL: 0,
    DATABASE: "Refresco",
    SEMAFORO_GLOBAL: "AMARILLO",
  },
  {
    ID_PRODUCTO: 3320,
    DESCRIPCION: "seven up six",
    ACTIVO_OPM: 0,
    ACTIVO_SIO: 0,
    ACTIVO_HH: 1,
    CANAL: 1,
    DATABASE: "Refresco",
    SEMAFORO_GLOBAL: "VERDE",
  },
  {
    ID_PRODUCTO: 3370,
    DESCRIPCION: "seven up six",
    ACTIVO_OPM: 1,
    ACTIVO_SIO: 0,
    ACTIVO_HH: 0,
    CANAL: 2,
    DATABASE: "Refresco",
    SEMAFORO_GLOBAL: "ROJO",
  },
  {
    ID_PRODUCTO: 3320,
    DESCRIPCION: "seven up six",
    ACTIVO_OPM: 0,
    ACTIVO_SIO: 0,
    ACTIVO_HH: 1,
    CANAL: 1,
    DATABASE: "Refresco",
    SEMAFORO_GLOBAL: "VERDE",
  },
  {
    ID_PRODUCTO: 3370,
    DESCRIPCION: "seven up six",
    ACTIVO_OPM: 1,
    ACTIVO_SIO: 0,
    ACTIVO_HH: 0,
    CANAL: 2,
    DATABASE: "Refresco",
    SEMAFORO_GLOBAL: "ROJO",
  },
  {
    ID_PRODUCTO: 3320,
    DESCRIPCION: "seven up six",
    ACTIVO_OPM: 0,
    ACTIVO_SIO: 0,
    ACTIVO_HH: 1,
    CANAL: 1,
    DATABASE: "Refresco",
    SEMAFORO_GLOBAL: "VERDE",
  },
  {
    ID_PRODUCTO: 3370,
    DESCRIPCION: "seven up six",
    ACTIVO_OPM: 1,
    ACTIVO_SIO: 0,
    ACTIVO_HH: 0,
    CANAL: 2,
    DATABASE: "Refresco",
    SEMAFORO_GLOBAL: "ROJO",
  },
];

const SkuDetailTable: React.FC<SkuDetailTableProps> = ({ bodega, cliente }) => {
  // Para demo, ignoramos bodega y cliente y usamos datos dummy.
  // Si deseas que el valor de bodega y cliente se muestren en la UI, puedes agregarlos en la descripción.
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(50);

  useEffect(() => {
    // Simula la carga de datos (por ejemplo, con un timeout)
    setLoading(true);
    setTimeout(() => {
      setData(dummyData);
      setTotal(dummyData.length);
      setLoading(false);
    }, 500);
  }, [bodega, cliente]); // Si deseas recargar al cambiar bodega o cliente

  const table = useReactTable({
    data,
    columns: skuColumns,
    manualPagination: true,
    pageCount: Math.ceil(total / limit) || 1,
    state: {
      pagination: {
        pageIndex: page,
        pageSize: limit,
      },
    },
    onPaginationChange: (updater) => {
      const next =
        typeof updater === "function" ? updater({ pageIndex: page, pageSize: limit }) : updater;
      setPage(next.pageIndex);
      setLimit(next.pageSize);
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const isNextDisabled = page >= Math.ceil(total / limit) - 1;
  const isPrevDisabled = page === 0;

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", mt: 1 }}>
      <TableContainer
        sx={{
          maxHeight: 300,
          overflowY: "auto",
          overflowX: "auto",
        }}
      >
        <Table stickyHeader size="small" aria-label="tabla de SKUs">
          <TableHead>
            <TableRow>
              {table.getHeaderGroups().map((headerGroup) =>
                headerGroup.headers.map((header) => (
                  <TableCell key={header.id} style={{ minWidth: header.getSize() }}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableCell>
                ))
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={skuColumns.length}>Cargando SKUs...</TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50]}
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
                labelRowsPerPage="Filas por página"
                labelDisplayedRows={({ from, to, count }) => `${from}–${to} de ${count}`}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default SkuDetailTable;
