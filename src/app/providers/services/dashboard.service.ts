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
  SEARCH_CLIENTE_ID,
 } from '../client/queries/filters.queries';
import {
  DashboardFilterOptions,
  DashboardFilters,
  DashboardResponse,
  EtmDashboardFilterInput,
  FilterOptionsResponse,
} from '../../../shared/types/dashboard.types';
import { handleApiError } from '../utils/errorUtils';

const toStringArray = (arr: any[] = []): string[] => 
  arr.filter(Boolean).map(v => String(v));

const toNumberArray = (arr: any[] = []): number[] => 
  arr.filter(Boolean).map(v => typeof v === 'string' ? Number(v) : v);

const ensureString = (v: string | number | undefined): string | undefined =>
  v !== undefined ? String(v) : undefined;

// Helper para asegurar que un valor sea number para filtros
const ensureNumber = (v: string | number | undefined): number | undefined =>
  v !== undefined ? (typeof v === 'string' ? Number(v) : v) : undefined;

function mapFrontendFiltersToBackend(f: DashboardFilters): EtmDashboardFilterInput {
  return {
    nombre:        f.nombre ?? undefined,
    cliente:       f.cliente ?? undefined,
    localidad:     typeof f.localidad === 'string' ? f.localidad : (typeof f.localidad === 'number' ? String(f.localidad) : undefined),
    bodega:        typeof f.bodega === 'number' ? f.bodega : (typeof f.bodega === 'string' ? Number(f.bodega) : undefined),
    region:        typeof f.region === 'string' ? f.region : (typeof f.region === 'number' ? String(f.region) : undefined),
    zona:          typeof f.zona === 'string' ? f.zona : (typeof f.zona === 'number' ? String(f.zona) : undefined),
    ruta:          typeof f.ruta === 'number' ? f.ruta : (typeof f.ruta === 'string' ? Number(f.ruta) : undefined),
    clasificacion: typeof f.clasificacion === 'string' ? f.clasificacion : (typeof f.clasificacion === 'number' ? String(f.clasificacion) : undefined),
    claveLista:    typeof f.claveLista === 'number' ? f.claveLista : (typeof f.claveLista === 'string' ? Number(f.claveLista) : undefined),
    canal:         typeof f.canal === 'number' ? f.canal : (typeof f.canal === 'string' ? Number(f.canal) : undefined),
    
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
      console.log('Recibido en service:', page, limit, filters);
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

  async searchClientId(partial: number): Promise<number[]> {
    if (isNaN(partial)) {
      return Promise.resolve([]);
    }
    
    try {
      const { data } = await client.query({
        query: SEARCH_CLIENTE_ID,
        variables: { partial, limit: 50 },
        fetchPolicy: 'network-only',
      });
      return data.searchClienteId ?? [];
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
      
      // Asegurar que los tipos retornados sean correctos
      const result = data.getDistinctFilterOptions ?? {
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
      };
      
      // Corregir tipos de las listas
      return {
        ...result,
        localidades: toStringArray(result.localidades),
        bodegas: toNumberArray(result.bodegas),
        regiones: toStringArray(result.regiones),
        zonas: toStringArray(result.zonas),
        rutas: toNumberArray(result.rutas || result.ruta),
        claveLista: toNumberArray(result.claveLista),
        canal: toNumberArray(result.canal),
        clasificaciones: toStringArray(result.clasificaciones),
      };
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
      return toStringArray(data.getZonasFiltered ?? []);
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
      return toStringArray(data.getRegionsFiltered ?? []);
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
      return toStringArray(data.getClasificacionFiltered ?? []);
    } catch (err) {
      throw handleApiError(err);
    }
  },

  async fetchRutaFiltered(
    filters: EtmDashboardFilterInput,
  ): Promise<number[]> {
    try {
      const { data } = await client.query({
        query: GET_RUTA_FILTERED,
        variables: { filters },
        fetchPolicy: 'network-only',
      });
      return toNumberArray(data.getRutaFiltered ?? []);
    } catch (err) {
      throw handleApiError(err);
    }
  },

  async fetchCanalFiltered(
    filters: EtmDashboardFilterInput,
  ): Promise<number[]> {
    try {
      const { data } = await client.query({
        query: GET_CANAL_FILTERED,
        variables: { filters },
        fetchPolicy: 'network-only',
      });
      return toNumberArray(data.getCanalFiltered ?? []);
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
      return toStringArray(data.getBodegaFiltered ?? []);
    } catch (err) {
      throw handleApiError(err);
    }
  },

  async fetchIdBodegaFiltered(
    filters: EtmDashboardFilterInput,
  ): Promise<number[]> {
    try {
      const { data } = await client.query({
        query: GET_IDBODEGA_FILTERED,
        variables: { filters },
        fetchPolicy: 'network-only',
      });
      return toNumberArray(data.getIdBodegaFiltered ?? []);
    } catch (err) {
      throw handleApiError(err);
    }
  },

  async fetchClaveListaFiltered(
    filters: EtmDashboardFilterInput,
  ): Promise<number[]> {
    try {
      const { data } = await client.query({
        query: GET_CLAVELISTA_FILTERED,
        variables: { filters },
        fetchPolicy: 'network-only',
      });
      return toNumberArray(data.getClaveListaFiltered ?? []);
    } catch (err) {
      throw handleApiError(err);
    }
  },

 /**
   * Devuelve las listas dependientes cuando el usuario selecciona el
   * primer filtro de la cascada.  Siempre responde con un objeto que
   * incluye TODAS las propiedades definidas en DashboardFilterOptions,
   * aunque algunas lleguen vacías ([]) si no aplican para el caso.
   */
  async fetchCascadingOptions(
    key: string,
    value: string | number | undefined,
  ): Promise<DashboardFilterOptions> {
    // Helper para "incluir" el valor elegido en su propia lista
    const selfString = (v: string | number | undefined): string[] => 
      v != null ? [String(v)] : [];
      
    const selfNumber = (v: string | number | undefined): number[] => 
      v != null ? [typeof v === 'string' ? Number(v) : v] : [];

    switch (key) {
      /* ────────────────────────── LOCALIDAD ───────────────────────── */
      case 'localidad':
        return {
          localidades: selfString(value),                             // ← propia
          bodegas:      await this.fetchIdBodegaFiltered({ localidad: ensureString(value) }),
          regiones:     await this.fetchRegionsFiltered({ localidad: ensureString(value) }),
          zonas:        await this.fetchZonasFiltered({ localidad: ensureString(value) }),
          clasificaciones: await this.fetchClasificacionFiltered({ localidad: ensureString(value) }),
          ruta:         await this.fetchRutaFiltered({ localidad: ensureString(value) }),
          canal:        await this.fetchCanalFiltered({ localidad: ensureString(value) }),
          claveLista:   await this.fetchClaveListaFiltered({ localidad: ensureString(value) }),
        };

      /* ─────────────────────────── BODEGA (ID) ────────────────────── */
      case 'bodega':
        return {
          localidades:  await this.fetchBodegaFiltered({ bodega: ensureNumber(value) }),
          bodegas:      selfNumber(value),
          regiones:     await this.fetchRegionsFiltered({ bodega: ensureNumber(value) }),
          zonas:        await this.fetchZonasFiltered({ bodega: ensureNumber(value) }),
          clasificaciones: await this.fetchClasificacionFiltered({ bodega: ensureNumber(value) }),
          ruta:         await this.fetchRutaFiltered({ bodega: ensureNumber(value) }),
          canal:        await this.fetchCanalFiltered({ bodega: ensureNumber(value) }),
          claveLista:   await this.fetchClaveListaFiltered({ bodega: ensureNumber(value) }),
         
        };

      /* ─────────────────────────── REGIÓN ─────────────────────────── */
      case 'region':
        return {
          localidades:  await this.fetchBodegaFiltered({ region: ensureString(value) }),
          bodegas:      await this.fetchIdBodegaFiltered({ region:  ensureString(value) }),
          regiones:     selfString(value),
          zonas:        await this.fetchZonasFiltered({ region:  ensureString(value) }),
          clasificaciones: await this.fetchClasificacionFiltered({ region:  ensureString(value) }),
          ruta:         await this.fetchRutaFiltered({ region:  ensureString(value) }),
          canal:        await this.fetchCanalFiltered({ region:  ensureString(value) }),
          claveLista:   await this.fetchClaveListaFiltered({ region:  ensureString(value) }),
        };

      /* ─────────────────────────── ZONA ───────────────────────────── */
      case 'zona':
        return {
          localidades:  await this.fetchBodegaFiltered({ zona:  ensureString(value) }),
          bodegas:      await this.fetchIdBodegaFiltered({ zona:  ensureString(value) }),
          regiones:     await this.fetchRegionsFiltered({ zona:  ensureString(value) }),
          zonas:        selfString(value),
          clasificaciones: await this.fetchClasificacionFiltered({ zona:  ensureString(value) }),
          ruta:         await this.fetchRutaFiltered({ zona:  ensureString(value) }),
          canal:        await this.fetchCanalFiltered({ zona:  ensureString(value) }),
          claveLista:   await this.fetchClaveListaFiltered({ zona:  ensureString(value) }),
        };

      /* ──────────────────────── CLASIFICACIÓN ─────────────────────── */
      case 'clasificacion':
        return {
          localidades:  await this.fetchBodegaFiltered({ clasificacion:  ensureString(value) }),
          bodegas:      await this.fetchIdBodegaFiltered({ clasificacion:  ensureString(value) }),
          regiones:     await this.fetchRegionsFiltered({ clasificacion:  ensureString(value) }),
          zonas:        await this.fetchZonasFiltered({ clasificacion:  ensureString(value) }),
          clasificaciones: selfString(value),
          ruta:         await this.fetchRutaFiltered({ clasificacion:  ensureString(value) }),
          canal:        await this.fetchCanalFiltered({ clasificacion:  ensureString(value) }),
          claveLista:   await this.fetchClaveListaFiltered({ clasificacion:  ensureString(value) }),
        };

      /* ─────────────────────────── RUTA ───────────────────────────── */
      case 'ruta':
        return {
          localidades:  await this.fetchBodegaFiltered({ ruta: ensureNumber(value) }),
          bodegas:      await this.fetchIdBodegaFiltered({ ruta: ensureNumber(value) }),
          regiones:     await this.fetchRegionsFiltered({ ruta: ensureNumber(value) }),
          zonas:        await this.fetchZonasFiltered({ ruta: ensureNumber(value) }),
          clasificaciones: await this.fetchClasificacionFiltered({ ruta: ensureNumber(value) }),
          ruta:         selfNumber(value),
          canal:        await this.fetchCanalFiltered({ ruta: ensureNumber(value) }),
          claveLista:   await this.fetchClaveListaFiltered({ ruta: ensureNumber(value) }),
        };

      /* ─────────────────────────── CANAL ──────────────────────────── */
      case 'canal':
        return {
          localidades:  await this.fetchBodegaFiltered({ canal: ensureNumber(value) }),
          bodegas:      await this.fetchIdBodegaFiltered({ canal: ensureNumber(value) }),
          regiones:     await this.fetchRegionsFiltered({ canal: ensureNumber(value) }),
          zonas:        await this.fetchZonasFiltered({ canal: ensureNumber(value) }),
          clasificaciones: await this.fetchClasificacionFiltered({ canal: ensureNumber(value) }),
          ruta:         await this.fetchRutaFiltered({ canal: ensureNumber(value) }),
          canal:        selfNumber(value),
          claveLista:   await this.fetchClaveListaFiltered({ canal: ensureNumber(value) }),
        };

      /* ───────────────────────── CLAVE LISTA ──────────────────────── */
      case 'claveLista':
        return {
          localidades:  await this.fetchBodegaFiltered({ claveLista: ensureNumber(value) }),
          bodegas:      await this.fetchIdBodegaFiltered({ claveLista: ensureNumber(value) }),
          regiones:     await this.fetchRegionsFiltered({ claveLista: ensureNumber(value) }),
          zonas:        await this.fetchZonasFiltered({ claveLista: ensureNumber(value) }),
          clasificaciones: await this.fetchClasificacionFiltered({ claveLista: ensureNumber(value) }),
          ruta:         await this.fetchRutaFiltered({ claveLista: ensureNumber(value) }),
          canal:        await this.fetchCanalFiltered({ claveLista: ensureNumber(value) }),
          claveLista:   selfNumber(value),
        };

      /* ─────────────────────────── DEFAULT ────────────────────────── */
      default:
        // Devuelve todas las listas "crudas" — útil si añades filtros nuevos
        return await this.fetchFilterOptions();
    }
  },
}