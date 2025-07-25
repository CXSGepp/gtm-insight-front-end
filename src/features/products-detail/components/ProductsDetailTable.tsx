import React, { useEffect } from 'react';
import { Box, CircularProgress } from '@mui/material';
import BaseTable from '../../../shared/components/base-table/BaseTable';
import { useSkuTableStore } from '../store/skuTableStore';
import { usePaginatedSkuQuery } from '../hooks/usePaginatedSkuQuery';
import { ColumnDef } from '@tanstack/react-table';
import { StatusChip } from '../../../shared/components/chips/StatusChip';
import { SemaforoDialogCell } from './SemaforoDialogCell';
import { useSnackbar } from '../../../shared/providers/SnackbarProvider';

interface SkuDetailTableProps {
  bodega: number;
}

export const skuColumns: ColumnDef<any>[] = [
  { accessorKey: 'ID_PRODUCTO', header: 'ID Producto' },
  { accessorKey: 'DESCRIPCION', header: 'Descripción', size: 200, minSize: 80, maxSize: 200 },
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
    cell: ({ cell }) => <StatusChip active={!!cell.getValue()} />,
  },
  {
    accessorKey: 'LISTA_PRECIOS',
    header: 'Vigencia Lista de precios',
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
    cell: ({ row }) => (
      <SemaforoDialogCell
        status={row.original.SEMAFORO_GLOBAL}
        activo_opm={row.original.ACTIVO_OPM}
        activo_sio={row.original.ACTIVO_SIO}
        canal={row.original._randomCanal}
        listaPrecio={row.original._randomListaPrecios}
        activo_hh={row.original.ACTIVO_HH}
      />
    ),
  },
  { accessorKey: 'DB_ORIGEN', header: 'Base de Datos' },
];

export default function SkuDetailTable({ bodega }: SkuDetailTableProps) {
  const { showSnackbar } = useSnackbar();
  const {
    page,
    pageSize,
    setPagination,
    setBodega,
    noDataNotified,
    setNoDataNotified,
  } = useSkuTableStore();

  const { rows: originalRows, total, isLoading } = usePaginatedSkuQuery({
    bodega,
    page,
    pageSize,
  });

  
  useEffect(() => {
    setBodega(bodega);

  }, [bodega, setBodega,]);

  useEffect(() => {
    if (!isLoading  && originalRows.length === 0 && !noDataNotified) {
      showSnackbar('No se encontraron productos para los parámetros seleccionados.', 'info');
      setNoDataNotified(true);
    }
  }, [isLoading , originalRows, noDataNotified, showSnackbar, setNoDataNotified]);


  if (isLoading  && originalRows.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={120}>
        <CircularProgress size={28} />
      </Box>
    );
  }

  return (
    <Box sx={{ overflowX: 'auto', borderRadius: 2, p: 1, maxWidth: '100%' }}>
      <BaseTable
        columns={skuColumns}
        data={originalRows}
        loading={isLoading }
        totalItems={total}
        pageIndex={page}
        pageSize={pageSize}
        onPaginationChange={(updater) => {
          const newPagination = typeof updater === 'function' ? updater({ pageIndex: page, pageSize }) : updater;
          setPagination(newPagination.pageIndex, newPagination.pageSize);
        }}
        darkMode
      />
    </Box>
  );
}