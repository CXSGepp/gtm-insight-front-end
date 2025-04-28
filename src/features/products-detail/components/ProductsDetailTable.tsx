import React from 'react';
import BaseTable from '../../../shared/components/base-table/BaseTable';
import { useSkuTableStore } from '../store/skuTableStore';
import { usePaginatedSkuQuery } from '../hooks/usePaginatedSkuQuery';
import { ColumnDef } from '@tanstack/react-table';
import { StatusChip } from '../../../shared/components/chips/StatusChip';
import { GlobalStatusChip } from '../../../shared/components/chips/GlobalStatusChip';


interface SkuDetailTableProps {
  bodega: number;
  cliente: number;
}

export const skuColumns: ColumnDef<any>[] = [
    { accessorKey: 'ID_PRODUCTO', header: 'ID Producto' },
    { accessorKey: 'DESCRIPCION', header: 'Descripción' },
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
      cell: ({ cell }) => <GlobalStatusChip status={cell.getValue<string>()} />, 
    },
    { accessorKey: 'CANAL', header: 'Canal' },
    { accessorKey: 'DATABASE', header: 'Base de Datos' },
  ];

export default function SkuDetailTable({ bodega, cliente }: SkuDetailTableProps) {
  const {page, pageSize, setPagination, setBodega, setCliente } = useSkuTableStore();
  const { rows, total, loading } = usePaginatedSkuQuery();
  React.useEffect(() => {
    setBodega(bodega);
    setCliente(cliente);
  }, [bodega, cliente, setBodega, setCliente]);

  return (
    <BaseTable
      columns={skuColumns}
      data={rows}
      loading={loading}
      totalItems={total}
      pageIndex={page}
      pageSize={pageSize}
      onPaginationChange={(newPage, newSize) => setPagination(newPage, newSize)}
    />
  );
}
