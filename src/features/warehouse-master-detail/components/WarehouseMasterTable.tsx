import React from 'react';
import BaseTable from '../../../shared/components/base-table/BaseTable';
import { useWarehouseTableStore } from '../store/warehouseTableStore';
import { usePaginatedWarehouseQuery } from '../hooks/usePaginatedWarehouseQuery';
import { ColumnDef } from '@tanstack/react-table';

const columns: ColumnDef<any>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'region', header: 'Región' },
  { accessorKey: 'zona', header: 'Zona' },
  { accessorKey: 'localidad', header: 'Localidad' },
  { accessorKey: 'bodega', header: 'Bodega' },
  { accessorKey: 'ruta', header: 'Ruta' },
  { accessorKey: 'tipoRuta', header: 'Tipo de Ruta' },
  { accessorKey: 'clasificacion', header: 'Clasificación' },
  { accessorKey: 'frecuencia', header: 'Frecuencia' },
  { accessorKey: 'claveLista', header: 'Clave Lista' },
  { accessorKey: 'activa', header: 'Activo' },
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
