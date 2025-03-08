import { ApolloProvider } from '@apollo/client';
import {client } from './config/apollo';
import { DashboardTable } from './components/Table/DashboardTable';
import { DashboardFilters } from './components/Filters/DashboardFilters';
import { DashboardLayout } from './components/Layout/DashboardLayout';
function App() {
  return (
    <ApolloProvider client={client}>
        <DashboardLayout>
        <DashboardFilters />
        <DashboardTable />
      </DashboardLayout>
    </ApolloProvider>
  );
}

 export default App; 