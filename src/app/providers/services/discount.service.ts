// src/app/providers/services/discount.service.ts
import { client } from '../client/graphqlClient';
import { GET_DISCOUNTS_FOR_ROW } from '../client/queries/discount.queries';
import { DiscountResponse, DiscountQueryParams } from '../../../shared/types/discount.types';
import { handleApiError } from '../utils/errorUtils';

export const discountService = {
  async fetchDiscountsForRow(params: DiscountQueryParams): Promise<DiscountResponse> {
    try {
      const filters = Object.fromEntries(
        Object.entries(params).filter(([_, v]) => v !== undefined)
      );
      console.log('[🚀 GraphQL Request] GET_DISCOUNTS_FOR_ROW with params:', params);

      const { data } = await client.query({
        query: GET_DISCOUNTS_FOR_ROW,
        variables: { filters },
        fetchPolicy: 'network-only',
      });

      console.log('[✅ GraphQL Response]', data.getDiscountsForRow);

      return {
        items: data.getDiscountsForRow?.items || [],
        total: data.getDiscountsForRow?.total || 0,
        hasMore: data.getDiscountsForRow?.hasMore || false,
        page: params.page || 0, // We'll manage the page state on the client side
      };
    } catch (err) {
      console.error('[❌ GraphQL Error - fetchDiscountsForRow]', err);
      throw handleApiError(err);
    }
  },
};