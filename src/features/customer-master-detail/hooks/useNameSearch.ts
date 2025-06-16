import { useEffect, useState } from 'react';
import { client } from '../../../app/providers/client/graphqlClient';
import { gql } from '@apollo/client';

const SEARCH_NOMBRES = gql`
  query SearchNombres($partial: String!, $limit: Float!) {
    searchNombres(partial: $partial, limit: $limit)
  }
`;

export function useNameSearch(input: string) {
  const [options, setOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (input.length < 3) return;

    let cancel = false;

    const fetchNombres = async () => {
      setLoading(true);
      try {
        const { data } = await client.query({
          query: SEARCH_NOMBRES,
          variables: {
            partial: input,
            limit: 100,
          },
        });

    console.log('[🚀 Nombre API Response]', data?.searchNombres); 
        if (!cancel) setOptions(data?.searchNombres || []);
      } catch (e) {
        if (!cancel) setOptions([]);
      } finally {
        if (!cancel) setLoading(false);
      }
    };

    fetchNombres();

    return () => {
      cancel = true;
    };
  }, [input]);

  return { options, loading };
}
