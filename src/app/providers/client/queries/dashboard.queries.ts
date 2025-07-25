import { gql } from '@apollo/client';
import { ETM_DASHBOARD_FIELDS, ETM_DASHBOARD_FIELDS_WAREHOUSE  } from './fragments/dashboard.fragment';

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


export const GET_REPORT_ETM_DASHBOARD_WAREHOUSE = gql`
    ${ETM_DASHBOARD_FIELDS_WAREHOUSE}
    query getReportWarehouseEtmDashboard(
        $filters: EtmDashboardFilterInput
    ) {
        getReportWarehouseEtmDashboard(filters: $filters) {
            items {
                ...DashboardFieldsWarehouse
            }
            total
            hasMore
            page
        }
    }
`;