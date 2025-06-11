import { gql } from '@apollo/client';
import { ETM_DASHBOARD_FIELDS } from './fragments/dashboard.fragment';

export const GET_REPORT_ETM_DASHBOARD = gql`
    ${ETM_DASHBOARD_FIELDS}
    query getReportEtmDashboard(
        $filters: EtmDashboardFilterInput
    ) {
        getReportEtmDashboard(filters: $filters) {
            items {
                ...DashboardFields
            }
            total
            hasMore
            page
        }
    }
`;