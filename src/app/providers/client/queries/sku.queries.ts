import { gql } from '@apollo/client';
import { SKU_FIELDS } from './fragments/sku.fragment';

export const GET_SKUS_FOR_ROW = gql`
    ${SKU_FIELDS}
    query getSkusForRow($filters: GetEtmSkusDto!) {
        getSkusForRow(filters: $filters) {
            items {
                ...SkuFields
            }
            total
            hasMore
            page
        }
    }
`;