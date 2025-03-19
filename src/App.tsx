import { ApolloProvider } from '@apollo/client';
import { client } from './api/graphqlClient';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <ApolloProvider client={client}>
      <Dashboard />
    </ApolloProvider>
  );
}

export default App; 