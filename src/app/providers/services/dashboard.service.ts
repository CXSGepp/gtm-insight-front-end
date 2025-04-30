// src/app/providers/services/dashboard.service.ts
import { client } from '../client/graphqlClient';
import { GET_REPORT_ETM_DASHBOARD } from '../client/queries/dashboard.queries';
import { GET_DISTINCT_FILTER_OPTIONS } from '../client/queries/filters.queries';

import {
  DashboardFilters,
  DashboardResponse,
  EtmDashboardFilterInput,
  FilterOptionsResponse
} from '../../../shared/types/dashboard.types';
import { handleApiError } from '../utils/errorUtils';

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
    viewMode: filters.viewMode ?? 'CUSTOMER',
    fechaRegistro: filters.fechaRegistro,
  };
}

function cleanFilters(obj: EtmDashboardFilterInput): EtmDashboardFilterInput {
  const cleaned = Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== '' && v !== undefined && v !== null)
  ) as EtmDashboardFilterInput;

  cleaned.viewMode = obj.viewMode ?? 'CUSTOMER';
  return cleaned;
}

export const dashboardService = {
  async fetchDashboardData(
    page = 0,
    limit = 50,
    filters: DashboardFilters = {},
    mode: 'CUSTOMER' | 'WAREHOUSE' = 'CUSTOMER',
  ): Promise<DashboardResponse> {
    try {
      const backendFilters = cleanFilters(mapFrontendFiltersToBackend(filters));
      backendFilters.viewMode = mode;

      const { data } = await client.query({
        query: GET_REPORT_ETM_DASHBOARD,
        variables: {
          page,
          limit: Math.min(Math.max(1, limit), 100),
          filters: backendFilters,
        },
        fetchPolicy: 'network-only',
      });
      console.log('[🔥 Backend raw response]', data);

      return data.getReportEtmDashboard ?? {
        items: [],
        hasMore: false,
        total: 0,
        page: 0,
      };
    } catch (err) {
      throw handleApiError(err);
    }
  },

  async fetchFilterOptions(): Promise<FilterOptionsResponse['getDistinctFilterOptions']> {
    try {
      const { data } = await client.query({
        query: GET_DISTINCT_FILTER_OPTIONS,
        fetchPolicy: 'network-only',
      });

      return data.getDistinctFilterOptions ?? {
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
