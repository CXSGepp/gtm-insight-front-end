import { client } from '../client/graphqlClient';
import { GET_SKUS_FOR_ROW } from '../client/queries/sku.queries';
import { SkuResponse, SkuQueryParams } from '../../../shared/types/sku.types';
import { handleApiError } from '../utils/errorUtils';

export const skuService = {
  async fetchSkusForRow(params: SkuQueryParams): Promise<SkuResponse> {
    try {
      console.log('[🚀 GraphQL Request] GET_SKUS_FOR_ROW with params:', params);

      const { data } = await client.query({
        query: GET_SKUS_FOR_ROW,
        variables: params,
        fetchPolicy: 'network-only',
      });

      console.log('[✅ GraphQL Response]', data.getSkusForRow);

      return data.getSkusForRow ?? {
        items: [],
        total: 0,
        hasMore: false,
        page: 0,
      };
    } catch (err) {
      console.error('[❌ GraphQL Error - fetchSkusForRow]', err);
      throw handleApiError(err);
    }
  },
};
