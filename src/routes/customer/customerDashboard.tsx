import React, { useEffect } from 'react';
import CustomerFilters from '../../features/customer-master-detail/components/CustomerFilters';
import CustomerMasterTable from '../../features/customer-master-detail/components/CustomerMasterTable';
import MasterDetailLayout from '../../features/layout/components/master-detail/MasterDetailLayout';
import { useCustomerTableStore } from '../../features/customer-master-detail/store/customerTableStore';

export default function CustomerDashboardRoute() {
  const { setFilters } = useCustomerTableStore();
  useEffect(() => {
    setFilters((prev) => ({ ...prev, viewMode: 'CUSTOMER'}));

  }, []);
  return (
    <MasterDetailLayout
      filters={<CustomerFilters />}
      masterTable={<CustomerMasterTable />}
    />
  );
}
