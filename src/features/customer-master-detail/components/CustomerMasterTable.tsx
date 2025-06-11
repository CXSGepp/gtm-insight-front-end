import React from 'react';
import { usePaginatedCustomerQuery } from '../hooks/usePaginatedCustomerQuery';
import { useCustomerTableStore } from '../store/customerTableStore';
import { ColumnDef } from '@tanstack/react-table';
import BaseTable from '../../../shared/components/base-table/BaseTable';
import Pagination from '../../../shared/components/pagination/Pagination';
import SkuDetailTable from '../../products-detail/components/ProductsDetailTable';

interface CustomerDashboardItem {
  ID: number;
  NOMBRE: string;
  CLIENTE: number;
  LOCALIDAD: string;
  ID_BODEGA: number
  REGION: string;
  ZONA: string;
  RUTA: string;
  CLASIFICACION: string;
  FRECUENCIA: string;
  CLAVE_LISTA: number;
  CANAL: number;
  TELEFONO: number;
  DIRECCION: string;


}

const columns: ColumnDef<CustomerDashboardItem>[] = [
  { accessorKey: 'NOMBRE', header: 'Nombre' },
  { accessorKey: 'CLIENTE', header: 'Cliente' },
  { accessorKey: 'LOCALIDAD', header: 'Bodega' },
  { accessorKey: 'ID_BODEGA', header: 'Id Bodega' },
  { accessorKey: 'REGION', header: 'Región' },
  { accessorKey: 'ZONA', header: 'Zona' },
  { accessorKey: 'RUTA', header: 'Ruta' },
  { accessorKey: 'CLASIFICACION', header: 'Clasificación' },
  { accessorKey: 'FRECUENCIA', header: 'Frecuencia' },
  {
    accessorKey: 'CLAVE_LISTA',
    header: 'Clave Lista',
    cell: ({ getValue }) => getValue() ?? '—',
  },
  { accessorKey: 'CANAL', header: 'Canal' },
  {
    accessorKey: 'TELEFONO',
    header: 'Teléfono',
    cell: ({ getValue }) => {
      const tel = getValue();
      if (!tel) return '—';
      const str = tel.toString().padStart(10, '0');
      return `📞 ${str.slice(0, 3)}-${str.slice(3, 6)}-${str.slice(6)}`;
    },
  },
  {
    accessorKey: 'DIRECCION',
    header: 'Dirección',
    cell: ({ getValue }) => getValue() ?? '—',
  }
];

export default function CustomerMasterTable() {
  const { rows, total, loading, page, pageSize } = usePaginatedCustomerQuery();
  const { setPage, setPageSize } = useCustomerTableStore();

    const renderDetail = React.useCallback(
       (row) =>
         row.ID_BODEGA ? (
           <SkuDetailTable
             bodega={row.ID_BODEGA}
             cliente={row.CLIENTE}
             claveLista={row.CLAVE_LISTA}
           />
         ) : null,
       []
     );

  return (
    <>
      <BaseTable
        columns={columns}
        data={rows}
        loading={loading}
        totalItems={total}
        pageIndex={page}
        pageSize={pageSize}
        onPaginationChange={(p, s) => {
          setPage(p);
          setPageSize(s);
        }}
        expandableRowContent={renderDetail}           // ← useCallback
        getRowId={(r) => String(r.ID)}
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
