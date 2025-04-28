import React from 'react';
import CustomerFilters from '../../features/customer-master-detail/components/CustomerFilters';
import CustomerMasterTable from '../../features/customer-master-detail/components/CustomerMasterTable';
import MasterDetailLayout from '../../features/layout/components/master-detail/MasterDetailLayout';

export default function CustomerDashboardRoute() {
  return (
    <MasterDetailLayout
      filters={<CustomerFilters />}
      masterTable={<CustomerMasterTable />}
    />
  );
}
