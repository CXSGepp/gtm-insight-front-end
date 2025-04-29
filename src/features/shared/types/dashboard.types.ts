
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
    CLASIFICA: string;
    FRECUENCIA: string;
    CLAVE_LISTA: string;
    ACTIVA: boolean;
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
    cliente?: number;
    telefonos?: string[];
    region?: string;
    zona?: string;
    clasificaciones?: string[];
    tiposruta?: string[];
    bodega?: number;
    skus?: string[];
    baseDatos?: string;
    estatusOpm?: string;
    estatusSio?: string;
    uopm?: string;
}

export interface DashboardFilterOptions {
    clientes: string[];
    telefonos: string[];
    regiones: string[];
    zonas: string[];
    bodegas: string[];
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