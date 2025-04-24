import { ApolloClient, from, HttpLink } from '@apollo/client';
import { errorLink } from './errorHandling';
import { createCacheConfig } from './cacheConfig';

const httpLink = new HttpLink({
  uri: 'http://localhost:3000/graphql',
});

const clientConfig = {
  link: from([errorLink, httpLink]),
  cache: createCacheConfig(), // Using the cache configuration from cacheConfig.ts
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only' as const,
      nextFetchPolicy: 'network-only' as const,
    },
    query: {
      fetchPolicy: 'network-only' as const,
    },
  }
};

export const client = new ApolloClient(clientConfig);