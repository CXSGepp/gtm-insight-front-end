// src/api/queries/dashboard.queries.ts
import { gql } from '@apollo/client';
import { ETM_DASHBOARD_FIELDS } from './fragments/dashboard.fragment';

export const GET_REPORT_ETM_DASHBOARD = gql`
    ${ETM_DASHBOARD_FIELDS}
    query getReportEtmDashboard(
        $page: Int, 
        $limit: Int, 
        $filters: EtmDashboardFilterInput
    ) {
        getReportEtmDashboard(page: $page, limit: $limit, filters: $filters) {
            items {
                ...DashboardFields
            }
            total
            hasMore
            page
        }
    }
`;