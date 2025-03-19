import { client } from './graphqlClient';
import { GET_REPORT_ETM_DASHBOARD, GET_DISTINCT_FILTER_OPTIONS } from  './queries';

export const fetchEtmDashboardData = async (
    page: number = 0, 
    limit = 50, 
    filters = {}) => {
    try {
        const validLimit = Math.min(Math.max(1, limit), 100);
        
        const { data } = await client.query({
            query: GET_REPORT_ETM_DASHBOARD,
            variables: { 
                page,
                limit: validLimit, 
                filters },
            fetchPolicy: 'network-only',
        });
        return {
            items: data.getReportEtmDashboard.items,
            total: data.getReportEtmDashboard.total,
            hasMore: data.getReportEtmDashboard.hasMore,
            page: data.getReportEtmDashboard.page,

        }

    } catch (error) {
        console.log(`Error fetching ETM Dashboard data: ${error}`);
        return { 
            items: [],
            hasMore: false,
            page:  0,
            total: 0};
    }


}

export async function fetchDistinctFilters() {
    try {
        const { data } = await client.query({
            query: GET_DISTINCT_FILTER_OPTIONS,
            fetchPolicy: "network-only",
        });

        console.log("✅ Filters successfully fetched:", data.getDistinctFilterOptions);

        return data.getDistinctFilterOptions || {};
    } catch (error) {
        console.error("❌ Error fetching filter options:", error);
        return {}; 
    }
}