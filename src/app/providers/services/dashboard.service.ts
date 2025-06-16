import { client } from '../client/graphqlClient';
import { GET_REPORT_ETM_DASHBOARD } from '../client/queries/dashboard.queries';
import { GET_DISTINCT_FILTER_OPTIONS,
  GET_ZONAS_FILTERED,
  GET_REGIONS_FILTERED,
  GET_CLASIFICACION_FILTERED,
  GET_RUTA_FILTERED,
  GET_CANAL_FILTERED,
  GET_BODEGA_FILTERED,
  GET_IDBODEGA_FILTERED,
  GET_CLAVELISTA_FILTERED,
 } from '../client/queries/filters.queries';
import {
  DashboardFilters,
  DashboardResponse,
  EtmDashboardFilterInput,
  FilterOptionsResponse,
} from '../../../shared/types/dashboard.types';
import { handleApiError } from '../utils/errorUtils';

function mapFrontendFiltersToBackend(f: DashboardFilters): EtmDashboardFilterInput {
  return {
    nombre:        f.nombre,
    cliente:       f.cliente,
    localidad:     f.localidad,
    bodega:        f.bodega,
    region:        f.region,
    zona:          f.zona,
    ruta:          f.ruta,
    clasificacion: f.clasificacion,
    claveLista:    f.claveLista,
    canal:         f.canal,
    uopm:          f.uopm,
    telefono:      f.telefono,
    direccion:     f.direccion,
    sku:           f.sku,
    descripcion:   f.descripcion,
    estatusOpm:    f.estatusOpm,
    estatusSio:    f.estatusSio,
  
  };
}


const clean = (o: EtmDashboardFilterInput) =>
  Object.fromEntries(
    Object.entries(o).filter(([_, v]) => v !== '' && v != null),
  ) as EtmDashboardFilterInput;

/* ---- service object ---- */
export const dashboardService = {
  async fetchDashboardData(
    page = 0,
    limit = 50,
    filters: DashboardFilters = {},
  ): Promise<DashboardResponse> {
    try {
      const backendFilters = clean(mapFrontendFiltersToBackend(filters));
      backendFilters.page = page;
      backendFilters.limit = Math.min(Math.max(1, limit), 100);

      const { data } = await client.query({
        query: GET_REPORT_ETM_DASHBOARD,
        variables: { filters: backendFilters },
        fetchPolicy: 'network-only',
      });

      return (
        data.getReportEtmDashboard ?? {
          items: [],
          total: 0,
          hasMore: false,
          page: 0,
        }
      );
    } catch (err) {
      throw handleApiError(err);
    }
  },

  async fetchFilterOptions(): Promise<
    FilterOptionsResponse['getDistinctFilterOptions']
  > {
    try {
      const { data } = await client.query({
        query: GET_DISTINCT_FILTER_OPTIONS,
        fetchPolicy: 'network-only',
      });
      return (
        data.getDistinctFilterOptions ?? {

          localidades: [],
          bodegas: [],
          productos: [],
          descripciones: [],
          clientes: [],
          telefonos: [],
          regiones: [],
          zonas: [],
          rutas: [],
          claveLista: [],
          canal: [],
          clasificaciones: [],
        }
      );
    } catch (err) {
      throw handleApiError(err);
    }
  },


  async fetchZonasFiltered(
    filters: EtmDashboardFilterInput,
  ): Promise<string[]> {
    try {
      const { data } = await client.query({
        query: GET_ZONAS_FILTERED,
        variables: { filters },
        fetchPolicy: 'network-only',
      });
      return data.getZonasFiltered ?? [];
    } catch (err) {
      throw handleApiError(err);
    }
  },

  async fetchRegionsFiltered(
    filters: EtmDashboardFilterInput,
  ): Promise<string[]> {
    try {
      const { data } = await client.query({
        query: GET_REGIONS_FILTERED,
        variables: { filters },
        fetchPolicy: 'network-only',
      });
      return data.getRegionsFiltered ?? [];
    } catch (err) {
      throw handleApiError(err);
    }
  },

  async fetchClasificacionFiltered(
    filters: EtmDashboardFilterInput,
  ): Promise<string[]> {
    try {
      const { data } = await client.query({
        query: GET_CLASIFICACION_FILTERED,
        variables: { filters },
        fetchPolicy: 'network-only',
      });
      return data.getClasificacionFiltered ?? [];
    } catch (err) {
      throw handleApiError(err);
    }
  },

  async fetchRutaFiltered(
    filters: EtmDashboardFilterInput,
  ): Promise<string[]> {
    try {
      const { data } = await client.query({
        query: GET_RUTA_FILTERED,
        variables: { filters },
        fetchPolicy: 'network-only',
      });
      return data.getRutaFiltered ?? [];
    } catch (err) {
      throw handleApiError(err);
    }
  },

  async fetchCanalFiltered(
    filters: EtmDashboardFilterInput,
  ): Promise<string[]> {
    try {
      const { data } = await client.query({
        query: GET_CANAL_FILTERED,
        variables: { filters },
        fetchPolicy: 'network-only',
      });
      return data.getCanalFiltered ?? [];
    } catch (err) {
      throw handleApiError(err);
    }
  },
  async fetchBodegaFiltered(
    filters: EtmDashboardFilterInput,
  ): Promise<string[]> {
    try {
      const { data } = await client.query({
        query: GET_BODEGA_FILTERED,
        variables: { filters },
        fetchPolicy: 'network-only',
      });
      return data.getIdBodegaFiltered ?? [];
    } catch (err) {
      throw handleApiError(err);
    }
  },

  async fetchIdBodegaFiltered(
    filters: EtmDashboardFilterInput,
  ): Promise<string[]> {
    try {
      const { data } = await client.query({
        query: GET_IDBODEGA_FILTERED,
        variables: { filters },
        fetchPolicy: 'network-only',
      });
      return data.getIdBodegaFiltered ?? [];
    } catch (err) {
      throw handleApiError(err);
    }
  },

  async fetchClaveListaFiltered(
    filters: EtmDashboardFilterInput,
  ): Promise<string[]> {
    try {
      const { data } = await client.query({
        query: GET_CLAVELISTA_FILTERED,
        variables: { filters },
        fetchPolicy: 'network-only',
      });
      return data.getClaveListaFiltered ?? [];
    } catch (err) {
      throw handleApiError(err);
    }
  },





}