import React, { useEffect, useState } from 'react';
import {
  Box,
  CircularProgress,
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
import { useDiscountProductsQuery } from '../hooks/useDiscountProducts';
import { DiscProductsDetailDialog } from './DiscProductsDetailDialog';
import { useSnackbar } from '../../../shared/providers/SnackbarProvider';

interface DiscountDetailTableProps {
  bodega: number;
  cliente?: number;
}

export default function DiscountsDetailTable({
  bodega,
  cliente
}: DiscountDetailTableProps) {
  const { showSnackbar } = useSnackbar();
  const {
    page,
    pageSize,
    setPagination,
    patchFilters,
    noDataNotified,
    setNoDataNotified,
  } = useDiscountTableStore();

  const { rows, total, loading } = usePaginatedDiscountQuery();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDiscountId, setSelectedDiscountId] = useState<number | null>(null);


  const { data: productsData, loading: productsLoading } = useDiscountProductsQuery({
      bodega,
      cliente,
      id_desc: selectedDiscountId,
      page: 1,
      limit: 100,
  });

  useEffect(() => {
  patchFilters({ bodega, cliente });
  }, [bodega, cliente, patchFilters]);

  useEffect(() => {
    if (!loading && rows.length === 0 && !noDataNotified) {
      showSnackbar('No se encontraron descuentos para los parámetros seleccionados.', 'info');
      setNoDataNotified(true);
    }
  }, [loading, rows, noDataNotified, showSnackbar, setNoDataNotified]);

   const handleOpenProducts = (discountId: number) => {
    setSelectedDiscountId(discountId);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedDiscountId(null);
  };

  const discountColumns: ColumnDef<any>[] = [
    { accessorKey: 'DESCID', header: 'Id Descuento' },
    {
      id: 'productos',
      header:  () => 'Productos',
      cell: ({ row }) => (
      <Tooltip title="Ver productos asociados al descuento">
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
    { accessorKey: 'DESCNAME', header: 'Nombre Descuento' },
    { accessorKey: 'MAXNUM', header: 'Impactos'},
    { accessorKey: 'IDDESCUENTOMSIO', header: 'Id Descuento MsiO'},

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
      accessorKey: 'EXCLUSIVOMPEPW',
      header: 'Exclusivo PEPW',
      cell: ({ cell }) => <StatusChip active={!!cell.getValue()} />,
    },
    { accessorKey: 'FECHASTART', header: 'Fecha Inicio' },
    { accessorKey: 'FECHAEND', header: 'Fecha Fin' },
    {
      accessorKey: 'VIGENTE',
      header: 'Vigente',
      cell: ({ cell }) => <GlobalStatusChip status={cell.getValue() ? 'verde' : 'rojo'} />,
    },
  ];

 return (
    <>
      <BaseTable
        columns={discountColumns}
        data={rows}
        loading={loading}
        totalItems={total}
        pageIndex={page}
        pageSize={pageSize}
  
          onPaginationChange={(paginationUpdater) => {
 
          const oldState = { page, pageSize };
          const newState =
            typeof paginationUpdater === 'function'
              ? paginationUpdater(oldState)
              : paginationUpdater;
          
          setPagination(newState.pageIndex, newState.pageSize);
        }}
        darkMode
      />

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