import React from 'react';
import { usePaginatedCustomerQuery } from '../hooks/usePaginatedCustomerQuery';
import { useCustomerTableStore } from '../store/customerTableStore';
import { ColumnDef } from '@tanstack/react-table';
import BaseTable from '../../../shared/components/base-table/BaseTable';
import Pagination from '../../../shared/components/pagination/Pagination';
import SkuDetailTable from '../../products-detail/components/ProductsDetailTable'; // We'll create it

interface CustomerDashboardItem {
  ID: number;
  REGION: string;
  ZONA: string;
  LOCALIDAD: string;
  BODEGA: number;
  RUTA: string;
  CLIENTE: number;
  NOMBRE: string;
  TIPO_RUTA: string;
  CLASIFICACION: string;
  FRECUENCIA: string;
  CLAVE_LISTA: string;
  ACTIVA: boolean;
  TELEFONO: string;
  DIRECCION: string;
}

const columns: ColumnDef<CustomerDashboardItem>[] = [
  { accessorKey: 'ID', header: 'ID' },
  { accessorKey: 'REGION', header: 'Región' },
  { accessorKey: 'ZONA', header: 'Zona' },
  { accessorKey: 'LOCALIDAD', header: 'Localidad' },
  { accessorKey: 'BODEGA', header: 'Bodega' },
  { accessorKey: 'RUTA', header: 'Ruta' },
  { accessorKey: 'CLIENTE', header: 'Cliente' },
  { accessorKey: 'NOMBRE', header: 'Nombre' },
  { accessorKey: 'TIPO_RUTA', header: 'Tipo de Ruta' },
  { accessorKey: 'CLASIFICACION', header: 'Clasificación' },
  { accessorKey: 'FRECUENCIA', header: 'Frecuencia' },
  { accessorKey: 'CLAVE_LISTA', header: 'Clave Lista' },
  { accessorKey: 'ACTIVA', header: 'Activa' },
  { accessorKey: 'TELEFONO', header: 'Teléfono' },
  { accessorKey: 'DIRECCION', header: 'Dirección' },
];


export default function CustomerMasterTable() {
  const { rows, total, loading, page, pageSize } = usePaginatedCustomerQuery();
  const { setPage, setPageSize } = useCustomerTableStore();

  return (
    <>
      <BaseTable<CustomerDashboardItem>
        columns={columns}
        data={rows ?? []}
        loading={loading}
        totalItems={total ?? 0}
        pageIndex={page ?? 0}
        pageSize={pageSize ?? 50}
        onPaginationChange={(newPage, newPageSize) => {
          setPage(newPage);
          setPageSize(newPageSize);
        }}
        expandableRowContent={(row) => (
          <SkuDetailTable
            bodega={row.BODEGA}
            cliente={row.CLIENTE}
          />
        )}
        getRowId={(row) => String(row.ID)}
      />

      <Pagination
        page={page}
        pageSize={pageSize}
        totalItems={total}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />
    </>
  );
}
