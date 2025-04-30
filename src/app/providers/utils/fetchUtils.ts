import { OperationVariables, QueryOptions } from "@apollo/client";
import { DocumentNode } from "graphql";
import { client } from '../client/graphqlClient';

const createFetchOptions = <T, V extends OperationVariables>(
  options: Partial<QueryOptions<T, V>>
): Partial<QueryOptions<T, V>> => ({
  fetchPolicy: 'network-only' as const,
  ...options,
});

export const fetchWithRetry = async <T, V extends OperationVariables>(
  query: DocumentNode,
  variables?: V,
  options: Partial<Omit<QueryOptions<T, V>, 'query' | 'variables'>> = {}
): Promise<T> => {
  const maxRetries = 3;
  let retries = 0;

  while (retries < maxRetries) {
    try {
      const fetchOptions = createFetchOptions<T, V>(options);
      const { data } = await client.query<T, V>({
        query,
        variables, // tipo V | undefined correcto
        ...fetchOptions,
      });
      return data;
    } catch (error) {
      if (retries === maxRetries - 1) throw error;
      retries++;
      await new Promise((resolve) => setTimeout(resolve, 1000 * retries));
    }
  }

  throw new Error("Fetch failed after retries");
};
