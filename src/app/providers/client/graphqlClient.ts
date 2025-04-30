import { ApolloClient, from, HttpLink } from '@apollo/client';
import { RetryLink } from '@apollo/client/link/retry';
import { errorLink } from './errorHandling';
import { createCacheConfig } from './cacheConfig';

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_GRAPHQL_API_URL,
});

const retryLink = new RetryLink({
  delay: { initial: 500, max: 2_000, jitter: true },
  attempts: { max: 3},  
});


export const client = new ApolloClient({
  link: from([errorLink, retryLink, httpLink]),
  cache: createCacheConfig(),
  defaultOptions: {
    watchQuery: { fetchPolicy: 'cache-and-network', errorPolicy: 'all' },
    query: { fetchPolicy: 'network-only', errorPolicy: 'all'  },
  },
});