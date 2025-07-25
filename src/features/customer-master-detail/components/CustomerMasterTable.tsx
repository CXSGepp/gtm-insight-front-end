import React, { useEffect, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import IconButton from '@mui/material/IconButton';
import BaseTable from '../../../shared/components/base-table/BaseTable';
import Pagination from '../../../shared/components/pagination/Pagination';
import SkuDetailTable from '../../products-detail/components/ProductsDetailTable';
import DiscountsDetailTable from '../../discounts-detail/components/DiscountsDetailTable';
import InventorySharpIcon from '@mui/icons-material/InventorySharp';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import Tooltip from '@mui/material/Tooltip';
import { Box} from '@mui/material';
import { useCustomerDashboardStore } from '../store/customerTableStore';
import { GlassDialog } from '../../../shared/components/dialog/base-dialog';
import { GlobalStatusChip } from '../../../shared/components/chips/GlobalStatusChip';
import { useSnackbar } from '../../../shared/providers/SnackbarProvider'; // Importa el hook
import { usePaginatedCustomerQuery } from '../hooks/usePaginatedCustomerQuery';

interface CustomerDashboardItem {
  ID_BODEGA: number;
  NOMBRE: string;
  CLIENTE: number;

}

export default function CustomerMasterTable() {
 const { showSnackbar } = useSnackbar();
  const { 
    page, 
    pageSize, 
    setPagination,
    noDataNotified, 
    setNoDataNotified,
  } = useCustomerDashboardStore();

const { rows, total, loading } = usePaginatedCustomerQuery();


  useEffect(() => {
    if (!loading && rows.length === 0 && !noDataNotified) {
      showSnackbar('No se encontraron datos para los filtros seleccionados.', 'info');
      setNoDataNotified(true); 
    }
  }, [loading, rows, noDataNotified, showSnackbar, setNoDataNotified]);


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerDashboardItem | null>(null);
  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false);
  const [selectedDiscountCustomer, setSelectedDiscountCustomer] = useState<CustomerDashboardItem | null>(null);


  const handleOpenModal = (customer: CustomerDashboardItem) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCustomer(null);
  };

  const handleOpenDiscountModal = (customer: CustomerDashboardItem) => {
    setSelectedDiscountCustomer(customer);
    setIsDiscountModalOpen(true);
  };

  const handleCloseDiscountModal = () => {
    setIsDiscountModalOpen(false);
    setSelectedDiscountCustomer(null);
  };

  const columns: ColumnDef<CustomerDashboardItem>[] = [
    {
      id: 'view-products',
      header: () => 'Productos',
      cell: ({ row }) => (
        <Tooltip title="Ver productos asociados al cliente">
          <IconButton
            size="small"
            onClick={() => handleOpenModal(row.original)}
            aria-label="view products"
          >
            <InventorySharpIcon />
          </IconButton>
        </Tooltip>
      ),
      size: 50,
    },
    {
      id: 'view-discounts',
      header: () => 'Descuentos',
      cell: ({ row }) => (
        <Tooltip title="Ver descuentos del cliente">
          <IconButton
            size="small"
            onClick={() => handleOpenDiscountModal(row.original)}
            aria-label="view discounts"
          >
            <LocalOfferIcon />
          </IconButton>
        </Tooltip>
      ),
      size: 50,
    },
    { accessorKey: 'NOMBRE', header: 'Nombre' },
    { accessorKey: 'CLIENTE', header: 'Cliente' },
    { accessorKey: 'LOCALIDAD', header: 'Bodega' },
    { accessorKey: 'ID_BODEGA', header: 'Id Bodega' },
  
    { accessorKey: 'REGION', header: 'Región' },
    { accessorKey: 'ZONA', header: 'Zona' },
    { accessorKey: 'RUTA', header: 'Ruta' },
    { accessorKey: 'CLASIFICACION', header: 'Clasificación' },
    { accessorKey: 'PRG_LEALTAD', header: 'Programa de Lealtad',
    cell: ({ getValue }) => {
        const status = getValue<string>();
        if (!status) {
          return '—';
        }
        return <GlobalStatusChip  status={status} />;
      
     },
    },
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
    },
  ];

  return (
    <>
      <BaseTable
        columns={columns}
        data={rows}
        loading={loading}
        totalItems={total}
        pageIndex={page}
        pageSize={pageSize}
        onPageChange={(p) => setPagination(p, pageSize)}
        onPageSizeChange={(s) => setPagination(page, s)}
        getRowId={(r) => String(r.ID)}
      />
      <Pagination
        page={page}
        pageSize={pageSize}
        totalItems={total}
        onPageChange={(p) => setPagination(p, pageSize)}
        onPageSizeChange={(s) => setPagination(page, s)}
      />

      {/* Modal Productos */}
      {selectedCustomer && (
        <GlassDialog
          open={isModalOpen}
          onClose={handleCloseModal}
          maxWidth="lg"
          fullWidth
          title={
            <Box>
              Productos para: <strong>{selectedCustomer.NOMBRE}</strong>
              <br />
              <small>
                Cliente ID: {selectedCustomer.CLIENTE} - Bodega: {selectedCustomer.ID_BODEGA}
              </small>
            </Box>
          }
        >
            <SkuDetailTable
              bodega={selectedCustomer.ID_BODEGA}

            />

        </GlassDialog>
      )}

      {/* Modal Descuentos */}
      {selectedDiscountCustomer && (
        <GlassDialog
          open={isDiscountModalOpen}
          onClose={handleCloseDiscountModal}
          maxWidth="lg"
          fullWidth
          title={ 
              <Box>
              Descuentos para: <strong>{selectedDiscountCustomer.NOMBRE}</strong>
              <br />
              <small>
                Cliente ID: {selectedDiscountCustomer.CLIENTE} - Bodega: {selectedDiscountCustomer.ID_BODEGA}
              </small>
            </Box>
          }
    
        >
            <DiscountsDetailTable
              bodega={selectedDiscountCustomer.ID_BODEGA}
              cliente={selectedDiscountCustomer.CLIENTE}
              page={0}
              pageSize={10}
            />
        
        </GlassDialog>
      )}
    </>
  );
}
