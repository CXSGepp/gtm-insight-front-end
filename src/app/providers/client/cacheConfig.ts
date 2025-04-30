// src/app/providers/client/cacheConfig.ts
import { InMemoryCache } from '@apollo/client';

export const createCacheConfig = () => new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        getReportEtmDashboard: {
          keyArgs: ['filters'],
          merge: (_existing, incoming) => {
            return incoming; // 👈 reemplaza totalmente, no mezcles páginas
          },
        },
      },
    },
  },
});
