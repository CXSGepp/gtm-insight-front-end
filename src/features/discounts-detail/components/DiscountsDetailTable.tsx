// src/features/discounts-detail/components/DiscountsDetailTable.tsx
import React from 'react';
import { Box, CircularProgress, Typography, Paper } from '@mui/material';
import BaseTable from '../../../shared/components/base-table/BaseTable';
import { useDiscountTableStore } from '../store/discountTableStore';
import { usePaginatedDiscountQuery } from '../hooks/usePaginatedDiscountQuery';
import { ColumnDef } from '@tanstack/react-table';
import { StatusChip } from '../../../shared/components/chips/StatusChip';
import { GlobalStatusChip } from '../../../shared/components/chips/GlobalStatusChip';

interface DiscountsDetailTableProps {
  bodega: number;
  cliente?: number;
  page: number;
  pageSize: number;
}

export const discountColumns: ColumnDef<any>[] = [
  { accessorKey: 'DESCID', header: 'ID Descuento' },
  { accessorKey: 'DESCNAME', header: 'Nombre', size: 200, minSize: 80, maxSize: 200 },
  { accessorKey: 'DESCRIPCIONECOM', header: 'Descripción', size: 200 },
  { accessorKey: 'FECHASTART', header: 'Fecha Inicio' },
  { accessorKey: 'FECHAEND', header: 'Fecha Fin' },
  {
    accessorKey: 'EXCLUSIVOTLV',
    header: 'Exclusivo TLV',
    cell: ({ cell }) => <StatusChip active={!!cell.getValue()} />,
  },
  {
    accessorKey: 'EXCLUSIVOGETM',
    header: 'Exclusivo GETM',
    cell: ({ cell }) => <StatusChip active={!!cell.getValue()} />,
  },
  {
    accessorKey: 'EXCLUSIVOHHC',
    header: 'Exclusivo HH',
    cell: ({ cell }) => <StatusChip active={!!cell.getValue()} />,
  },
  {
    accessorKey: 'EXCLUSIVOMPEP',
    header: 'Exclusivo MPEP',
    cell: ({ cell }) => <StatusChip active={!!cell.getValue()} />,
  },
  {
    accessorKey: 'VIGENTE',
    header: 'Vigente',
    cell: ({ cell }) => <GlobalStatusChip status={cell.getValue() ? 'verde' : 'rojo'} />,
  },
];

export default function DiscountsDetailTable({
  bodega,
  cliente,
  page,
  pageSize,
}: DiscountsDetailTableProps) {
  const { setPagination, setBodega, setCliente } = useDiscountTableStore();
  const { rows, loading, total, hasMore } = usePaginatedDiscountQuery({
    bodega,
    cliente,
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
            No se encontraron descuentos para la bodega <b>{bodega}</b> o cliente <b>{cliente}</b>.
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
        columns={discountColumns}
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