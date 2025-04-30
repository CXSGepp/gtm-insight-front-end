// src/app/providers/services/sku.service.ts
import { client } from '../client/graphqlClient';
import { GET_SKUS_FOR_ROW } from '../client/queries/sku.queries';
import { SkuResponse, SkuQueryParams } from '../../../shared/types/sku.types';
import { handleApiError } from '../utils/errorUtils';

export const skuService = {
  async fetchSkusForRow(params: SkuQueryParams): Promise<SkuResponse> {
    try {
      const { data } = await client.query({
        query: GET_SKUS_FOR_ROW,
        variables: params,
        fetchPolicy: 'network-only',
      });

      return data.getSkusForRow ?? {
        items: [],
        total: 0,
        hasMore: false,
        page: 0,
      };
    } catch (err) {
      throw handleApiError(err);
    }
  },
};
