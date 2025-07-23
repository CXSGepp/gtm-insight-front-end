import React, { useEffect, useState } from 'react';
import {
  CircularProgress,
  Typography,
  Paper,
  Button,
  Tooltip,
  IconButton,
} from '@mui/material';
import BaseTable from '../../../shared/components/base-table/BaseTable';
import { useDiscountTableStore } from '../store/discountTableStore';
import { usePaginatedDiscountQuery } from '../hooks/usePaginatedDiscountQuery';
import { ColumnDef } from '@tanstack/react-table';
import { StatusChip } from '../../../shared/components/chips/StatusChip';
import { GlobalStatusChip } from '../../../shared/components/chips/GlobalStatusChip';
import InventorySharpIcon from '@mui/icons-material/InventorySharp';
// 1. Importa el hook y el componente del diálogo
import { useDiscountProductsQuery } from '../hooks/useDiscountProducts';
import { DiscProductsDetailDialog } from './DiscProductsDetailDialog';
import { GlassCard } from '../../../shared/components/glass-card/glass-card';

interface DiscountsDetailTableProps {
  bodega: number;
  cliente?: number;
  page: number;
  pageSize: number;
}

export default function DiscountsDetailTable({
  bodega,
  cliente,
  page,
  pageSize,
}: DiscountsDetailTableProps) {
  const { setPagination, setBodega, setCliente } = useDiscountTableStore();
  const { data: discountData, isLoading: discountsLoading } = usePaginatedDiscountQuery({
    bodega,
    cliente,
    page,
    pageSize,
  });

  // 2. Simplifica el estado local. Solo necesitas saber qué diálogo abrir.
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDiscountId, setSelectedDiscountId] = useState<number | null>(null);

  // 3. Usa el hook para obtener los productos del descuento seleccionado.
  //    Se activará solo cuando 'selectedDiscountId' tenga un valor.
  const { data: productsData, isLoading: productsLoading } = useDiscountProductsQuery({
      bodega,
      cliente,
      id_desc: selectedDiscountId,
      page: 1, // O la paginación que necesites para el modal
      limit: 100,
  });

  const handleOpenProducts = (discountId: number) => {
    setSelectedDiscountId(discountId);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedDiscountId(null); // Limpia el ID al cerrar
  };

  const discountColumns: ColumnDef<any>[] = [
    { accessorKey: 'DESCID', header: 'ID Descuento' },
    {
      id: 'productos',
      header:  () => 'Productos',
      cell: ({ row }) => (
      <Tooltip title="Ver productos al descuento">
       <IconButton
          size="small"
          onClick={() => handleOpenProducts(row.original.DESCID)}
          aria-label="products"
        >
          <InventorySharpIcon />
          </IconButton>
        </Tooltip>
      ),
      size: 80,
    },
    { accessorKey: 'DESCNAME', header: 'Descripción', size: 200, minSize: 80, maxSize: 200 },
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

  useEffect(() => {
    setBodega(bodega);
    if (cliente) setCliente(cliente);
  }, [bodega, cliente, setBodega, setCliente]);

  if (discountsLoading) {
    return (
      <GlassCard display="flex" justifyContent="center" alignItems="center" minHeight={120} >
        <CircularProgress size={28} />
      </GlassCard>
    );
  }

  if (!discountsLoading && (!discountData)) {
    return (
      <GlassCard
       sx={{ mt: 2,  borderRadius: 2 }}>
          <Typography variant="h6">
            No se encontraron descuentos para la bodega <b>{bodega}</b> o cliente <b>{cliente}</b>.
          </Typography>
      </GlassCard>
    );
  }

  return (
    <>
        <BaseTable
          columns={discountColumns}
          data={discountData?.items ?? []}
          loading={discountsLoading}
          totalItems={discountData?.total ?? 0}
          pageIndex={page}
          pageSize={pageSize}
          onPaginationChange={(newPage, newSize) => setPagination(newPage, newSize)}
          darkMode
        />
  

      {/* 5. Renderiza el componente del diálogo y pásale los datos del hook */}
      <DiscProductsDetailDialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        discountId={selectedDiscountId}
        loading={productsLoading}
        products={productsData?.items ?? []}
      />
    </>
  );
}