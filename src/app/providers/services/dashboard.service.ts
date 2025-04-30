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
    viewMode: filters.viewMode ?? 'CUSTOMER',
    fechaRegistro: filters.fechaRegistro,
  };
}

function cleanFilters(obj: EtmDashboardFilterInput): EtmDashboardFilterInput {
  const cleaned =  Object.fromEntries(
    Object.entries(obj).filter(
      ([key, v]) =>
        v !== '' && v !== undefined && v !== null &&
        key !== 'viewMode', 
    ),
  ) as EtmDashboardFilterInput;
  if (obj.viewMode) cleaned.viewMode = obj.viewMode;
  cleaned.viewMode = obj.viewMode ?? 'CUSTOMER'; // <- esto garantiza consistencia
  return cleaned;
}

/* ----------------------- main service ---------------------- */
export const dashboardService = {
  async fetchDashboardData(
    page = 0,
    limit = 50,
    filters: DashboardFilters = {},
    mode: 'CUSTOMER' | 'WAREHOUSE' = 'CUSTOMER',
  ): Promise<DashboardResponse> {
    console.log('⚡ fetchDashboardData →', mode, (new Error().stack || '').split('\n')[2].trim());

    try {
      const backendFilters = cleanFilters(mapFrontendFiltersToBackend(filters));
      backendFilters.viewMode = mode; 

      const params: DashboardQueryParams = {
        page,
        limit: Math.min(Math.max(1, limit), 100),
        filters: backendFilters,
      };
      console.log('[🧪 Filters sent to backend]', backendFilters);


      const raw = await fetchWithRetry<DashboardDataResponse, DashboardQueryParams>(
        GET_REPORT_ETM_DASHBOARD,
        params,
      );

      const data = raw.getReportEtmDashboard;
return {
  items: data?.items ?? [],
  total: data?.total ?? 0,
  hasMore: data?.hasMore ?? false,
  page: data?.page ?? 0,
};

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
      console.log('[🚨 RAW APOLLO DATA]', raw); 

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
