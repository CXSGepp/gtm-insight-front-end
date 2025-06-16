import React, { useState } from 'react';
import { usePaginatedCustomerQuery } from '../hooks/usePaginatedCustomerQuery';
import { useCustomerTableStore } from '../store/customerTableStore';
import { ColumnDef } from '@tanstack/react-table';
import IconButton from '@mui/material/IconButton';
import BaseTable from '../../../shared/components/base-table/BaseTable';
import Pagination from '../../../shared/components/pagination/Pagination';
import SkuDetailTable from '../../products-detail/components/ProductsDetailTable';
import InventorySharpIcon from '@mui/icons-material/InventorySharp';
import Tooltip from '@mui/material/Tooltip';
import { Box, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';


interface CustomerDashboardItem {
  ID: number;
  NOMBRE: string;
  CLIENTE: number;
  LOCALIDAD: string;
  ID_BODEGA: number;
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



export default function CustomerMasterTable() {
  const { rows, total, loading, page, pageSize } = usePaginatedCustomerQuery();
  const { setPage, setPageSize } = useCustomerTableStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerDashboardItem | null>(null);

  const handleOpenModal = (customer: CustomerDashboardItem) => { // Corregir la anotación de tipo
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCustomer(null);
  };

  const columns: ColumnDef<CustomerDashboardItem>[] = [
  {
    id: 'view-products',
      header: () => 'Productos',
      cell: ({ row }) => {
        const canViewProducts = true;
        return canViewProducts ? (
          <Tooltip title="Ver productos asociados al cliente">
            <IconButton
              size="small"
              onClick={() => handleOpenModal(row.original)}
              aria-label="view products"
            >
              <InventorySharpIcon />
            </IconButton>
          </Tooltip>
        ) : null;
      },
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
        onPaginationChange={(p, s) => {
          setPage(p);
          setPageSize(s);
        }}
  
        getRowId={(r) => String(r.ID)}
      />
      <Pagination
        page={page}
        pageSize={pageSize}
        totalItems={total}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />
    {/* Añadir el Dialog aquí */}
      {selectedCustomer && (
        <Dialog
          open={isModalOpen}
          onClose={handleCloseModal}
          maxWidth="lg"
          fullWidth
          PaperProps={{
            sx: {
              bgcolor: 'background.paper',
              backgroundImage: 'none' 
            }
          }}
        >
          <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              Productos para: <strong>{selectedCustomer.NOMBRE}</strong>
              <br />
              <small>Cliente ID: {selectedCustomer.CLIENTE} - Bodega: {selectedCustomer.ID_BODEGA}</small>
            </Box>
            <IconButton
              aria-label="close"
              onClick={handleCloseModal}
              sx={{ color: (theme) => theme.palette.grey[500] }}
            >
            <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <SkuDetailTable
              bodega={selectedCustomer.ID_BODEGA}
              cliente={selectedCustomer.CLIENTE}
              claveLista={selectedCustomer.CLAVE_LISTA}
              page={0} 
              pageSize={10} 
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="primary">
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}