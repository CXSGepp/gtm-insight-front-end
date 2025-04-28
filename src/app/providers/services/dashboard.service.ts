import { fetchWithRetry } from '../utils/fetchUtils';
import { GET_REPORT_ETM_DASHBOARD } from '../client/queries/dashboard.queries';
import { GET_DISTINCT_FILTER_OPTIONS } from '../client/queries/filters.queries';
import { 
    DashboardResponse, 
    DashboardFilters, 
    FilterOptionsResponse,
    DashboardDataResponse,
    DashboardQueryParams
} from '../../../shared/types/dashboard.types';
import { handleApiError } from '../utils/errorUtils';

export const dashboardService = {
    async fetchDashboardData(
        page: number = 0,
        limit: number = 50,
        filters: DashboardFilters = {}
    ): Promise<DashboardResponse> {
        try {
            const validLimit = Math.min(Math.max(1, limit), 100);
            const params: DashboardQueryParams = { 
                page, 
                limit: validLimit, 
                filters 
            };
            
            const response = await fetchWithRetry<DashboardDataResponse, DashboardQueryParams>(
                GET_REPORT_ETM_DASHBOARD,
                params
            );
            if (!response) throw new Error('No response from dashboard API');
            return response.getReportEtmDashboard;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    async fetchFilterOptions(): Promise<FilterOptionsResponse> {
        try {
            const response = await fetchWithRetry<FilterOptionsResponse, Record<string, never>>(
                GET_DISTINCT_FILTER_OPTIONS,
                {}
            );
            if (!response) throw new Error('No response from filter options API');
            return response;
        } catch (error) {
            throw handleApiError(error);
        }
    }
};
