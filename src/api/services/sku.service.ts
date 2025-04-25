// src/api/services/sku.service.ts
import { fetchWithRetry } from '../utils/fetchUtils';
import { GET_SKUS_FOR_ROW } from '../client/queries/sku.queries';
import { SkuResponse, SkuQueryParams, SkuDataResponse } from '../types/sku.types';
import { handleApiError } from '../utils/errorUtils';

export const skuService = {
    async fetchSkusForRow(params: SkuQueryParams): Promise<SkuResponse> {
        try {
            const response = await fetchWithRetry<SkuDataResponse, SkuQueryParams>(
                GET_SKUS_FOR_ROW,
                params
            );
            return response.getSkusForRow;
        } catch (error) {
            throw handleApiError(error);
        }
    }
};