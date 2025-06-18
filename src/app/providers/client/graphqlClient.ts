import { ApolloClient, from, HttpLink } from '@apollo/client';
import { RetryLink } from '@apollo/client/link/retry';
import { errorLink } from './errorHandling';
import { createCacheConfig } from './cacheConfig';
import { env } from '../../../config/env';
const httpLink = new HttpLink({
  uri: env.graphqlUrl,
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