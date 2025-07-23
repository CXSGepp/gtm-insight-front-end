import React from 'react';
import { Box, CircularProgress, Typography, Paper, Chip } from '@mui/material';
import BaseTable from '../../../shared/components/base-table/BaseTable';
import { useSkuTableStore } from '../store/skuTableStore';
import { usePaginatedSkuQuery } from '../hooks/usePaginatedSkuQuery';
import { ColumnDef } from '@tanstack/react-table';
import { StatusChip } from '../../../shared/components/chips/StatusChip';
import { SemaforoDialogCell } from './SemaforoDialogCell';
import { GlassCard } from '../../../shared/components/glass-card/glass-card';

interface SkuDetailTableProps {
  bodega: number;
  cliente?: number;
  claveLista?: number;
  idProducto?: number;
  descripcion?: string;
  page: number;
  pageSize: number;
}


function getRandomBool() {
  return Math.random() > 0.5;
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
  accessorKey: 'CANAL',
  header: 'Configuracion Canal',
  cell: ({ cell }) => (
    <StatusChip active={!!cell.getValue()} />
  ),
},
{
  accessorKey: 'LISTA_PRECIOS',
  header: 'Vigencia Lista de precios',
  cell: ({ cell }) => (
    <StatusChip active={!!cell.getValue()} />
  ),
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
        canal={row.original._randomCanal} // Usa el valor random generado
        listaPrecio={row.original._randomListaPrecios} // Usa el valor random generado
        activo_hh={row.original.ACTIVO_HH}
      />
    );
    }
  },


  { accessorKey: 'DB_ORIGEN', header: 'Base de Datos' },
];

export default function SkuDetailTable({ bodega, cliente, claveLista, page, pageSize }:  SkuDetailTableProps) {
  const { setPagination, setBodega } = useSkuTableStore();

  const { rows: originalRows, total, loading  } = usePaginatedSkuQuery({
    bodega,
    cliente,
    claveLista,
    page,
    pageSize,
  });

  React.useEffect(() => {
    setBodega(bodega);
  }, [bodega,  setBodega]);

  const rows = React.useMemo(() => (
    originalRows.map(row => ({
      ...row,
      _randomCanal: getRandomBool(),
      _randomListaPrecios: getRandomBool(),
    }))
  ), [originalRows]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={120}>
        <CircularProgress size={28} />
      </Box>
    );
  }

  if (!loading && rows.length === 0) {
    return (
      <GlassCard sx={{ mt: 2, borderRadius: 2 }}>
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
      </GlassCard>
    );
  }

  return (
    <Box
      sx={{
        overflowX: 'auto',
        borderRadius: 2,
        p: 1,
         maxWidth: '100%'
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
