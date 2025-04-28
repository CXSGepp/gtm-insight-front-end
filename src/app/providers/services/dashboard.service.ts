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
import { EtmDashboardFilterInput } from '../../../shared/types/dashboard.types'; 
import { handleApiError } from '../utils/errorUtils';

/* ---------------------------- */
/* 🛠 Mapping function           */
/* ---------------------------- */
function mapFrontendFiltersToBackend(filters: DashboardFilters): EtmDashboardFilterInput {
  return {
    cliente: filters.cliente,
    telefono: filters.telefono,
    region: filters.region,
    zona: filters.zona,
    tiposRuta: filters.tiposRuta,
    clasificacion: filters.clasificacion,
    bodega: filters.bodega,
    sku: filters.sku,
    bd: filters.bd,
    estatusOpm: filters.estatusOpm,
    estatusSio: filters.estatusSio,
    uopm: filters.uopm,
    localidad: filters.localidad,
    ruta: filters.ruta,
    nombre: filters.nombre,
    claveLista: filters.claveLista,
    activa: filters.activa,
    direccion: filters.direccion,
    viewMode: filters.viewMode,
    fechaRegistro: filters.fechaRegistro,
  };
}

/* ---------------------------- */
/* 🧠 Dashboard service         */
/* ---------------------------- */
export const dashboardService = {
  async fetchDashboardData(
    page: number = 0,
    limit: number = 50,
    filters: DashboardFilters = {},
  ): Promise<DashboardResponse> {
    try {
      const validLimit = Math.min(Math.max(1, limit), 100);
      const mappedFilters = mapFrontendFiltersToBackend(filters);
      const params: DashboardQueryParams = {
        page,
        limit: validLimit,
        filters: mappedFilters,
      };

      const response = await fetchWithRetry<DashboardDataResponse, DashboardQueryParams>(
        GET_REPORT_ETM_DASHBOARD,
        params
      );

      if (!response || !response.getReportEtmDashboard) {
        console.warn('[DashboardService] No dashboard data found');
        return {
          items: [],
          total: 0,
          hasMore: false,
          page,
        };
      }

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
      if (!response || !response.getDistinctFilterOptions) {
        console.warn('[DashboardService] No filter options found');
        return {
          getDistinctFilterOptions: {
            clientes: [],
            telefonos: [],
            regiones: [],
            zonas: [],
            bodegas: [],
            tiposruta: [],
            clasificaciones: [],
          },
        };
      }
      return response;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};
