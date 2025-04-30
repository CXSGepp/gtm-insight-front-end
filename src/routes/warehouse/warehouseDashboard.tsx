import React from 'react';
import WarehouseFilters from '../../features/warehouse-master-detail/components/WarehouseFilters';
import WarehouseMasterTable from '../../features/warehouse-master-detail/components/WarehouseMasterTable';
import MasterDetailLayout from '../../features/layout/components/master-detail/MasterDetailLayout'; // 🔥 SIN llaves {}
import { useEffect } from 'react';
import { useWarehouseTableStore } from '../../features/warehouse-master-detail/store/warehouseTableStore';

export default function WarehouseDashboardRoute() {
  const { setFilters } = useWarehouseTableStore();
  useEffect(() => {
    setFilters((prev) => ({...prev, viewMode:  'WAREHOUSE '}));
    }, []); 
    return (
      <MasterDetailLayout
        filters={<WarehouseFilters />}
        masterTable={<WarehouseMasterTable />}
      />
    );
  }