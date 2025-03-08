import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getReportEtmDashboard: {
            // Separa el cache de acuerdo a "filters"
            keyArgs: ['filters'],
            merge(existing = { items: [] }, incoming, { args }) {
              // Si hay paginación por cursor, merge (append) en vez de sobrescribir
              if (args?.cursor) {
                return {
                  ...incoming,
                  items: [...(existing.items || []), ...incoming.items],
                };
              }
              // Si es la primera llamada (sin cursor), retornar lo nuevo sin concatenar
              return incoming;
            },
          },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      nextFetchPolicy: 'cache-first',
    },
  },
});
