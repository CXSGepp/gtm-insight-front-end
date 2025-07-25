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
import { useWarehouseTableStore } from '../store/warehouseTableStore';
import { GlassDialog } from '../../../shared/components/dialog/base-dialog';
import { GlobalStatusChip } from '../../../shared/components/chips/GlobalStatusChip';
import { useSnackbar } from '../../../shared/providers/SnackbarProvider'; // Importa el hook
import { usePaginatedWarehouseQuery } from '../hooks/usePaginatedWarehouseQuery';

interface WarehouseDashboardItem {
 BODEGA: number;
 LOCALIDAD: string;
}

export default function WarehouserMasterTable() {
 const { showSnackbar } = useSnackbar();
  const { 
    page, 
    pageSize, 
    setPagination,
    noDataNotified, 
    setNoDataNotified,
  } = useWarehouseTableStore();

const { rows, total, loading } = usePaginatedWarehouseQuery();


  useEffect(() => {
    if (!loading && rows.length === 0 && !noDataNotified) {
      showSnackbar('No se encontraron datos para los filtros seleccionados.', 'info');
      setNoDataNotified(true); 
    }
  }, [loading, rows, noDataNotified, showSnackbar, setNoDataNotified]);


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState<WarehouseDashboardItem | null>(null);
  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false);
  const [selectedDiscountWarehouse, setSelectedDiscountWarehouse] = useState<WarehouseDashboardItem | null>(null);


  const handleOpenModal = (warehouse: WarehouseDashboardItem) => {
    setSelectedWarehouse(warehouse);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedWarehouse(null);
  };

  const handleOpenDiscountModal = (customer: WarehouseDashboardItem) => {
    setSelectedDiscountWarehouse(customer);
    setIsDiscountModalOpen(true);
  };

  const handleCloseDiscountModal = () => {
    setIsDiscountModalOpen(false);
    setSelectedDiscountWarehouse(null);
  };

  const columns: ColumnDef<WarehouseDashboardItem>[] = [
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
    { accessorKey: 'LOCALIDAD', header: 'Bodega' },
    { accessorKey: 'BODEGA', header: 'Id Bodega' },
    { accessorKey: 'REGION', header: 'Región' },
    { accessorKey: 'ZONA', header: 'Zona' },
    { accessorKey: 'RUTA', header: 'Ruta' },
    { accessorKey: 'CLASIFICACION', header: 'Clasificación' },
    {
      accessorKey: 'CLAVE_LISTA',
      header: 'Clave Lista',
      cell: ({ getValue }) => getValue() ?? '—',
    },
    { accessorKey: 'CANAL', header: 'Canal' },
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
      {selectedWarehouse && (
        <GlassDialog
          open={isModalOpen}
          onClose={handleCloseModal}
          maxWidth="lg"
          fullWidth
          title={
            <Box>
              Productos para: <strong>{selectedWarehouse.LOCALIDAD}</strong>
              <br />
              <small>
                Boidega ID: {selectedWarehouse.BODEGA}
              </small>
            </Box>
          }
        >
            <SkuDetailTable
              bodega={selectedWarehouse.BODEGA}

            />

        </GlassDialog>
      )}

      {/* Modal Descuentos */}
      {selectedDiscountWarehouse && (
        <GlassDialog
          open={isDiscountModalOpen}
          onClose={handleCloseDiscountModal}
          maxWidth="lg"
          fullWidth
          title={ 
              <Box>
              Descuentos para: <strong>{selectedDiscountWarehouse.LOCALIDAD}</strong>
              <br />
              <small>
               Bodega: {selectedDiscountWarehouse.BODEGA}
              </small>
            </Box>
          }
    
        >
            <DiscountsDetailTable
              bodega={selectedDiscountWarehouse.BODEGA}
              page={0}
              pageSize={10}
            />
        
        </GlassDialog>
      )}
    </>
  );
}
