import { fetchWithRetry } from '../utils/fetchUtils';
import { GET_REPORT_ETM_DASHBOARD } from '../client/queries/dashboard.queries';
import { GET_DISTINCT_FILTER_OPTIONS } from '../client/queries/filters.queries';

import {
  DashboardResponse,
  DashboardFilters,
  DashboardDataResponse,
  DashboardQueryParams,
  FilterOptionsResponse,
  EtmDashboardFilterInput,
} from '../../../shared/types/dashboard.types';
import { handleApiError } from '../utils/errorUtils';

/* ------------------------- helpers ------------------------- */
function mapFrontendFiltersToBackend(
  filters: DashboardFilters,
): EtmDashboardFilterInput {
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

function cleanFilters(obj: EtmDashboardFilterInput): EtmDashboardFilterInput {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([_, v]) => v !== '' && v !== undefined && v !== null,
    ),
  ) as EtmDashboardFilterInput;
}

/* ----------------------- main service ---------------------- */
export const dashboardService = {
  async fetchDashboardData(
    page = 0,
    limit = 50,
    filters: DashboardFilters = {},
    mode: 'CUSTOMER' | 'WAREHOUSE' = 'CUSTOMER',
  ): Promise<DashboardResponse> {
    try {
      const params: DashboardQueryParams = {
        page,
        limit: Math.min(Math.max(1, limit), 100),
        mode,
        filters: cleanFilters(mapFrontendFiltersToBackend(filters)),
      };

      const raw = await fetchWithRetry<DashboardDataResponse, DashboardQueryParams>(
        GET_REPORT_ETM_DASHBOARD,
        params,
      );

      const data = raw.getReportEtmDashboard;
      return data ?? { items: [], total: 0, hasMore: false, page };
    } catch (err) {
      throw handleApiError(err);
    }
  },

  async fetchFilterOptions(): Promise<FilterOptionsResponse['getDistinctFilterOptions']> {
    try {
      const raw = await fetchWithRetry<FilterOptionsResponse, Record<string, never>>(
        GET_DISTINCT_FILTER_OPTIONS,
        {},
      );
      return raw.getDistinctFilterOptions ?? {
        clientes: [],
        telefonos: [],
        regiones: [],
        zonas: [],
        bodegas: [],
        tiposRuta: [],
        clasificaciones: [],
      };
    } catch (err) {
      throw handleApiError(err);
    }
  },
};
