import React from 'react';
import BaseTable from '../../../shared/components/base-table/BaseTable';
import { useWarehouseTableStore } from '../store/warehouseTableStore';
import { usePaginatedWarehouseQuery } from '../hooks/usePaginatedWarehouseQuery';
import { ColumnDef } from '@tanstack/react-table';

const columns: ColumnDef<any>[] = [
  { accessorKey: 'ID', header: 'ID' },
  { accessorKey: 'REGION', header: 'Región' },
  { accessorKey: 'ZONA', header: 'Zona' },
  { accessorKey: 'LOCALIDAD', header: 'Localidad' },
  { accessorKey: 'BODEGA', header: 'Bodega' },
  { accessorKey: 'RUTA', header: 'Ruta' },
  { accessorKey: 'TIPO_RUTA', header: 'Tipo de Ruta' },
  { accessorKey: 'CLASIFICACION', header: 'Clasificación' },
  { accessorKey: 'FRECUENCIA', header: 'Frecuencia' },
  { accessorKey: 'CLAVE_LISTA', header: 'Clave Lista' },
  { accessorKey: 'ACTIVA', header: 'Activo' },
];

export default function WarehouseMasterTable() {
  const { page, pageSize, setPagination } = useWarehouseTableStore(); // ✅ correct usage
  const { rows, total, loading } = usePaginatedWarehouseQuery();

  return (
    <BaseTable
      columns={columns}
      data={rows}
      loading={loading}
      totalItems={total}
      pageIndex={page} 
      pageSize={pageSize}
      onPaginationChange={(newPage, newSize) => setPagination(newPage, newSize)}
    />
  );
}
