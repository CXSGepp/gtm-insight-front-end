// src/api/queries/sku.queries.ts
import { gql } from '@apollo/client';
import { SKU_FIELDS } from './fragments/sku.fragment';

export const GET_SKUS_FOR_ROW = gql`
    ${SKU_FIELDS}
    query getSkusForRow(
        $page: Int,
        $limit: Int,
        $filters: EtmDashboardFilterInput,
        $bodega: Int!,
        $cliente: Int
    ) {
        getSkusForRow(
            page: $page,
            limit: $limit,
            filters: $filters,
            bodega: $bodega,
            cliente: $cliente
        ) {
            items {
                ...SkuFields
            }
            total
            hasMore
            page
        }
    }
`;
