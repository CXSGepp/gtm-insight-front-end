import React from 'react';
import WarehouseFilters from '../../../features/warehouse-master-detail/components/WarehouseFilters';
import WarehouseMasterTable from '../../../features/warehouse-master-detail/components/WarehouseMasterTable';
import MasterDetailLayout from '../../../features/layout/components/master-detail/MasterDetailLayout'; // 🔥 SIN llaves {}

export default function WarehouseDashboardRoute() {
    return (
      <MasterDetailLayout
        filters={<WarehouseFilters />}
        masterTable={<WarehouseMasterTable />}
      />
    );
  }