// src/app/providers/client/queries/discount.queries.ts
import { gql } from '@apollo/client';
import { DISCOUNT_FIELDS } from './fragments/discount.fragment';

export const GET_DISCOUNTS_FOR_ROW = gql`
  ${DISCOUNT_FIELDS}
  query getDiscountsForRow($filters: GetEtmDiscountsDto!) {
    getDiscountsForRow(filters: $filters) {
      items {
        ...DiscountFields
      }
      total
      hasMore
      # Removed the page field as it's not available in the response
    }
  }
`;