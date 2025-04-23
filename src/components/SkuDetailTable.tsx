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
  Typography,
  Box,
  Modal,
  Button,
} from "@mui/material";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { useTableStore } from "../store/useTableStore";

const mockPromotions = [
  { id: 1, promo: "2x1 en Julio", fechaInicio: "2025-07-01", fechaFin: "2025-07-31" },
  { id: 2, promo: "Descuento 10%", fechaInicio: "2025-08-01", fechaFin: "2025-08-15" },
];

const PromoModal = ({ open, handleClose, sku }: { open: boolean; handleClose: () => void; sku: string }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ p: 4, backgroundColor: "white", margin: "auto", mt: 10, width: 600, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Promociones simuladas para SKU: {sku}
        </Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell >ID</TableCell>
              <TableCell>Promoción</TableCell>
              <TableCell>Fecha Inicio</TableCell>
              <TableCell>Fecha Fin</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockPromotions.map((promo) => (
              <TableRow key={promo.id}>
                <TableCell sx={{color: "black"}}>{promo.id}</TableCell>
                <TableCell sx={{color: "black"}}>{promo.promo}</TableCell>
                <TableCell sx={{color: "black"}}>{promo.fechaInicio}</TableCell>
                <TableCell sx={{color: "black"}}>{promo.fechaFin}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Modal>
  );
};

const renderChip = (value: number) => (
  <Chip
    label={value === 1 ? "Active" : "Inactive"}
    variant="outlined"
    size="small"
    color={value === 1 ? "success" : "error"}
  />
);

const renderChipGlobal = (value: string) => {
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
  {
    accessorKey: "SEMAFORO_GLOBAL",
    header: "Semáforo Global",
    cell: ({ cell }) => renderChipGlobal(cell.getValue<string>()),
  },
  {
    id: "promos",
    header: "Promociones",
    cell: ({ row }) => (
      <Button size="small" variant="outlined" onClick={() => row.original.handleOpenModal(row.original.ID_PRODUCTO)}>
        Ver Promos
      </Button>
    ),
  },
];

interface SkuDetailTableProps {
  bodega: number;
  cliente?: number;
}

const dummyDataBase = [
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
    DESCRIPCION: "mirinda naranja",
    ACTIVO_OPM: 0,
    ACTIVO_SIO: 1,
    ACTIVO_HH: 0,
    CANAL: 1,
    DATABASE: "Refresco",
    SEMAFORO_GLOBAL: "ROJO"
  },
  {
    ID_PRODUCTO: 3340,
    DESCRIPCION: "pepsi black",
    ACTIVO_OPM: 1,
    ACTIVO_SIO: 1,
    ACTIVO_HH: 1,
    CANAL: 0,
    DATABASE: "Refresco",
    SEMAFORO_GLOBAL: "AMARILLO"
  },
  {
    ID_PRODUCTO: 4455,
    DESCRIPCION: "mountain dew",
    ACTIVO_OPM: 0,
    ACTIVO_SIO: 0,
    ACTIVO_HH: 1,
    CANAL: 2,
    DATABASE: "Refresco",
    SEMAFORO_GLOBAL: "VERDE"
  },
  {
    ID_PRODUCTO: 5566,
    DESCRIPCION: "lipton té",
    ACTIVO_OPM: 1,
    ACTIVO_SIO: 1,
    ACTIVO_HH: 0,
    CANAL: 2,
    DATABASE: "Té",
    SEMAFORO_GLOBAL: "VERDE"
  },
  {
    ID_PRODUCTO: 6677,
    DESCRIPCION: "agua pura",
    ACTIVO_OPM: 0,
    ACTIVO_SIO: 1,
    ACTIVO_HH: 1,
    CANAL: 0,
    DATABASE: "Agua",
    SEMAFORO_GLOBAL: "ROJO"
  },
  {
    ID_PRODUCTO: 7788,
    DESCRIPCION: "juguito kids",
    ACTIVO_OPM: 1,
    ACTIVO_SIO: 0,
    ACTIVO_HH: 1,
    CANAL: 1,
    DATABASE: "Jugos",
    SEMAFORO_GLOBAL: "AMARILLO"
  },
  {
    ID_PRODUCTO: 8899,
    DESCRIPCION: "gatorade blue",
    ACTIVO_OPM: 1,
    ACTIVO_SIO: 1,
    ACTIVO_HH: 1,
    CANAL: 1,
    DATABASE: "Energético",
    SEMAFORO_GLOBAL: "VERDE"
  },
  {
    ID_PRODUCTO: 9900,
    DESCRIPCION: "pepsi max",
    ACTIVO_OPM: 0,
    ACTIVO_SIO: 0,
    ACTIVO_HH: 0,
    CANAL: 0,
    DATABASE: "Refresco",
    SEMAFORO_GLOBAL: "ROJO"
  }
];

const SkuDetailTable: React.FC<SkuDetailTableProps> = ({ bodega, cliente }) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(50);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSku, setSelectedSku] = useState<string>("");

  const handleOpenModal = (sku: string) => {
    setSelectedSku(sku);
    setModalOpen(true);
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const enrichedData = dummyDataBase.map((item) => ({ ...item, handleOpenModal }));
      setData(enrichedData);
      setTotal(enrichedData.length);
      setLoading(false);
    }, 500);
  }, [bodega, cliente]);

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
      <TableContainer sx={{ maxHeight: 300, overflowY: "auto", overflowX: "auto" }}>
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
      <PromoModal open={modalOpen} handleClose={() => setModalOpen(false)} sku={selectedSku} />
    </Paper>
  );
};

export default SkuDetailTable;