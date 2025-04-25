// src/api/services/dashboard.service.ts
import { fetchWithRetry } from '../utils/fetchUtils';
import { GET_REPORT_ETM_DASHBOARD } from '../client/queries/dashboard.queries';
import { GET_DISTINCT_FILTER_OPTIONS } from '../client/queries/filters.queries';
import { 
    DashboardResponse, 
    DashboardFilters, 
    FilterOptionsResponse,
    DashboardDataResponse,
    DashboardQueryParams
} from '../types/dashboard.types';
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
            return response.getReportEtmDashboard;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    async fetchFilterOptions(): Promise<FilterOptionsResponse> {
        try {
            const response = await fetchWithRetry<FilterOptionsResponse, {}>(
                GET_DISTINCT_FILTER_OPTIONS,
                {}
            );
            return response;
        } catch (error) {
            throw handleApiError(error);
        }
    }
};
