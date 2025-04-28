export interface DashboardItem {
    ID: number;
    REGION: string;
    ZONA: string;
    LOCALIDAD: string;
    BODEGA: number;
    RUTA: string;
    CLIENTE?: number;
    NOMBRE?: string;
    TIPO_RUTA: string;
    CLASIFICACION: string;
    FRECUENCIA: string;
    CLAVE_LISTA: number;
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
    region?: string;
    zona?: string;
    localidad?: string;
    bodega?: number;
    ruta?: number;
    cliente?: number;
    nombre?: string;
    tipoRuta?: string;
    clasificacion?: string;
    claveLista?: number;
    activa?: string;
    telefono?: string;
    direccion?: string;
    viewMode?: string;
    sku?: string;
    bd?: string;
    uopm?: string;
    estatusOpm?: string;
    estatusSio?: string;
    fechaRegistro?: string;
  }
  
  export interface DashboardFilterOptions {
    clientes: string[];
    telefonos: string[];
    regiones: string[];
    zonas: string[];
    bodegas: number[]; // <<== fixed from string[] to number[]
    tiposruta: string[];
    clasificaciones: string[];
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
  region?: string;
  zona?: string;
  localidad?: string;
  bodega?: number;
  ruta?: number;
  cliente?: number;
  nombre?: string;
  tipoRuta?: string;
  clasificacion?: string;
  claveLista?: number;
  activa?: string;
  telefono?: string;
  direccion?: string;
  viewMode?: string;
  sku?: string;
  bd?: string;
  uopm?: string;
  estatusOpm?: string;
  estatusSio?: string;
  fechaRegistro?: string;
}
