import React from 'react';
import { Box, CircularProgress, Typography, Paper } from '@mui/material';
import BaseTable from '../../../shared/components/base-table/BaseTable';
import { useSkuTableStore } from '../store/skuTableStore';
import { usePaginatedSkuQuery } from '../hooks/usePaginatedSkuQuery';
import { ColumnDef } from '@tanstack/react-table';
import { StatusChip } from '../../../shared/components/chips/StatusChip';
import { SemaforoDialogCell } from './SemaforoDialogCell';

interface SkuDetailTableProps {
  bodega: number;
  cliente?: number;
  claveLista?: number;
  idProducto?: number;
  descripcion?: string;
  page: number;
  pageSize: number;
}

export const skuColumns: ColumnDef<any>[] = [
  { accessorKey: 'ID_PRODUCTO', header: 'ID Producto' },
  { accessorKey: 'DESCRIPCION', header: 'Descripción', size: 200, minSize: 80, maxSize: 200},
  {
    accessorKey: 'ACTIVO_OPM',
    header: 'Activo OPM',
    cell: ({ cell }) => <StatusChip active={!!cell.getValue()} />,
  },
  {
    accessorKey: 'ACTIVO_SIO',
    header: 'Activo SIO',
    cell: ({ cell }) => <StatusChip active={!!cell.getValue()} />,
  },
  {
    accessorKey: 'ACTIVO_HH',
    header: 'Activo HH',
    cell: ({ cell }) => <StatusChip active={!!cell.getValue()} />,
  },
  {
    accessorKey: 'SEMAFORO_GLOBAL',
    header: 'Semáforo Global',
    cell: ({ row }) => {
      return( 
      <SemaforoDialogCell
      
        status={row.original.SEMAFORO_GLOBAL}
        activo_opm={row.original.ACTIVO_OPM}
        activo_sio={row.original.ACTIVO_SIO}
        canal={row.original.CANAL}
      />
    );
    }
  },

  
  { accessorKey: 'DB_ORIGEN', header: 'Base de Datos' },
];

export default function SkuDetailTable({ bodega, cliente, claveLista, page, pageSize }:  SkuDetailTableProps) {
  const { setPagination, setBodega, setCliente } = useSkuTableStore();
  const { rows, total, loading } = usePaginatedSkuQuery({
    bodega,
    cliente,
    claveLista,
    page,
    pageSize,
  });

  React.useEffect(() => {
    setBodega(bodega);
    setCliente(cliente);
  }, [bodega, cliente, setBodega, setCliente]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={120} sx={{ backgroundColor: '#0c0c0c' }}>
        <CircularProgress size={28} />
      </Box>
    );
  }

  if (!loading && rows.length === 0) {
    return (
      <Box sx={{ mt: 2, backgroundColor: '#0c0c0c', borderRadius: 2 }}>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            backgroundColor: 'transparent',
            color: 'white',
            textAlign: 'center',
          }}
        >
          <Typography variant="subtitle1">
            No se han cargado datos para la bodega <b>{bodega}</b> o cliente <b>{cliente}</b>.
          </Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        overflowX: 'auto',
        backgroundColor: '#0c0c0c',
        borderRadius: 2,
        p: 1,
         maxWidth: '100%',
        '& table': {
          backgroundColor: '#0c0c0c',
          color: '#fff',
          borderCollapse: 'collapse',
        },
        '& th, & td': {
          borderColor: '#222',
          color: '#fff',
        },
        '& thead': {
          backgroundColor: '#00083a',
        },
        '& tbody tr:hover': {
          backgroundColor: '#1c1c1c',
        },
      }}
    >
     <BaseTable
  columns={skuColumns}
  data={rows}
  loading={loading}
  totalItems={total}
  pageIndex={page}
  pageSize={pageSize}
  onPaginationChange={(newPage, newSize) => setPagination(newPage, newSize)}
  darkMode
/>
    </Box>
  );
}
