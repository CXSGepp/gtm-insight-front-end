import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import BaseTable from '../../../shared/components/base-table/BaseTable';
import Pagination from '../../../shared/components/pagination/Pagination';
import SkuDetailTable from '../../products-detail/components/ProductsDetailTable';
import DiscountsDetailTable from '../../discounts-detail/components/DiscountsDetailTable';
import InventorySharpIcon from '@mui/icons-material/InventorySharp';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import Tooltip from '@mui/material/Tooltip';
import { Box} from '@mui/material';

import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '../../../app/providers/services/dashboard.service';
import { GlassDialog } from '../../../shared/components/dialog/base-dialog';


import { ColumnDef } from '@tanstack/react-table';
import { useWarehouseTableStore } from '../store/warehouseTableStore';

interface WarehouseDashboardItem {
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


export default function WarehouseMasterTable() {
  const { filters, page, pageSize, total, setPagination, setTotal } = useWarehouseTableStore();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState<WarehouseDashboardItem | null>(null);
  
  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false);
  const [selectedDiscountWarehouse, setSelectedDiscountWarehouse] = useState<WarehouseDashboardItem | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['warehouses', filters, page, pageSize],
    queryFn: async () => { 
      const result = await dashboardService.fetchDashboardData(page, pageSize, filters);
      setTotal(result.total);
      return result.items;
    },
   
  });

  const rows = data ?? [];
  
  const handleOpenModal = (warehouse: WarehouseDashboardItem) => {
    setSelectedWarehouse(warehouse);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedWarehouse(null);
  };

  const handleOpenDiscountModal = (warehouse: WarehouseDashboardItem) => {
    setSelectedDiscountWarehouse(warehouse);
    setIsDiscountModalOpen(true);
  };

  const handleCloseDiscountModal = () => {
    setIsDiscountModalOpen(false);
    setSelectedDiscountWarehouse(null);
  }

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

  ];

  return (
    <>
    <BaseTable
      columns={columns}
      data={rows}
      loading={isLoading}
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
          </Box>
        }
      >
        <SkuDetailTable
                     bodega={selectedWarehouse.ID_BODEGA}
                     page={0}
                     pageSize={10}
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
             </Box>
           }
     
         >
             <DiscountsDetailTable
               bodega={selectedDiscountWarehouse.ID_BODEGA}
               page={0}
               pageSize={10}
             />
         
         </GlassDialog>
       )}
     </>
   );

}