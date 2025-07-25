import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  CircularProgress,
  Typography,
  Chip,
} from '@mui/material';
// 1. Importa los componentes y tipos necesarios
import BaseTable from '../../../shared/components/base-table/BaseTable';
import { ColumnDef } from '@tanstack/react-table';
import { DiscProductItem } from '../../../shared/types/discount.types';
import { StatusChip } from '../../../shared/components/chips/StatusChip';
import { GlobalStatusChip } from '../../../shared/components/chips/GlobalStatusChip';
import { GlassDialog } from '../../../shared/components/dialog/base-dialog';

interface DiscProductsDetailDialogProps {
  open: boolean;
  onClose: () => void;
  discountId: number | null;
  loading: boolean;
  products: DiscProductItem[];
}


export function DiscProductsDetailDialog({
  open,
  onClose,
  discountId,
  loading,
  products,
}: DiscProductsDetailDialogProps) {

  const productColumns: ColumnDef<DiscProductItem>[] = [
    { accessorKey: 'ID_PRODUCTO', header: 'ID Producto' },
    { accessorKey: 'DESCRIPCION', header: 'Descripción', size: 250 },
    { accessorKey: 'NIVEL', header: 'Nivel' },
    { accessorKey: 'FECHASTART', header: 'Inicio' },
    { accessorKey: 'FECHAEND', header: 'Fin' },
    { 
      accessorKey: 'ACTIVO_OPM', 
      header: 'OPM', 
      cell: ({ cell }) => <StatusChip active={cell.getValue() === 1} /> 
    },
    { 
      accessorKey: 'ACTIVO_SIO', 
      header: 'SIO', 
      cell: ({ cell }) => <StatusChip active={cell.getValue() === 1} /> 
    },
    { 
      accessorKey: 'ACTIVO_HH', 
      header: 'HH', 
      cell: ({ cell }) => <StatusChip active={cell.getValue() === 1} /> 
    },
    {
      accessorKey: 'TIPO_MERCADO',
      header: 'Tipo Mercado',
      cell: ({ cell }) => <StatusChip active={cell.getValue() === 1} /> 
    },
    {
      accessorKey: 'CLAVE_LISTA',
      header: 'Clave Lista',
cell: ({ cell }) => <StatusChip active={cell.getValue() === 1} />     },
    {
      accessorKey: 'VIGENCIA_LISTA',
      header: 'Vigencia',
      cell: ({ cell }) => <StatusChip active={cell.getValue() === 1} />,
    },
    {
      accessorKey: 'SEMAFORO_GLOBAL',
      header: 'Semáforo',
      cell: ({ cell }) => <GlobalStatusChip status={cell.getValue() as string} />,
    },
  ];

  return (
    <GlassDialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      title= {
        <Typography>Productos del descuento: <Typography variant="h6" sx={{ fontWeight: 'Bold',}}>#{discountId}</Typography></Typography>
      }
    >
          <BaseTable
            columns={productColumns}
            data={products}
            loading={loading}
          />


    </GlassDialog>
  );
}