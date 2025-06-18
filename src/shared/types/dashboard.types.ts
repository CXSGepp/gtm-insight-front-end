export interface DashboardItem {
  ID: number;
  REGION: string;
  ZONA: string;
  LOCALIDAD: string;
  ID_BODEGA: number;
  RUTA: string;
  CLIENTE?: number;
  NOMBRE?: string;
  TIPO_RUTA: string;
  CLASIFICACION: string;
  FRECUENCIA: string;
  CLAVE_LISTA: number;
  CANAL: number;
  ACTIVA: string;
  TELEFONO?: string;
  DIRECCION?: string;
  LAST_UPDATED: string;
}

export interface DashboardResponse {
  items: DashboardItem[];
  total: number;
  hasMore: boolean;
  page: number;
}

export interface DashboardFilters {
  localidad?: string | number | null;
  bodega?: string | number | null;
  region?: string | number | null;
  zona?: string | number | null;
  clasificacion?: string | number | null;
  ruta?: string | number | null;
  canal?: string | number | null;
  claveLista?: string | number | null;
  sku?: string | number | null;
}

export interface DashboardFilterOptions {
  localidades: string[];
  bodegas: number[];
  regiones: string[];
  zonas: string[];
  ruta: number[];
  clasificaciones: string[];
  claveLista: number[];
  canal: number[];
  productos: number[];
  descripciones: string[];
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface DashboardQueryParams extends PaginationParams {
  filters: DashboardFilters;
}

export interface FilterOptionsResponse {
  getDistinctFilterOptions: DashboardFilterOptions;
}

export interface DashboardDataResponse {
  getReportEtmDashboard: DashboardResponse;
}

export interface EtmDashboardFilterInput {
  /* ── filtros “master” ─────────────────────────────── */
  localidad?: string;
  bodega?: number;
  nombre?: string;
  cliente?: number;
  telefono?: string;
  region?: string;
  zona?: string;
  ruta?: number;         
  clasificacion?: string;
  claveLista?: number;
  canal?: number;
  uopm?: string;
  direccion?: string;

  /* ── filtros de SKU ──────────────────────────────── */
  sku?: number;
  descripcion?: string;       
  estatusOpm?: string;
  estatusSio?: string;

  /* ── paginación ──────────────────────────────────── */
  page?: number;              
  limit?: number;

 
}