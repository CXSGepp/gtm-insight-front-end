import { DashboardFilters } from '../../Filters/DashboardFilters';

// Base types for dashboard items
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

// Response type for dashboard queries
export interface DashboardResponse {
    items: DashboardItem[];
    total: number;
    hasMore: boolean;
    page: number;
}

// Filter types
export interface DashboardFilters {
    // Client-Warehouse Mode filters
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

// Filter options type for distinct values
export interface DashboardFilterOptions {
    clientes: string[];
    telefonos: string[];
    regiones: string[];
    zonas: string[];
    bodegas: string[];
    tiposruta: string[];
    clasificaciones: string[];
}

// Pagination parameters
export interface PaginationParams {
    page: number;
    limit: number;
}

// Combined query parameters
export interface DashboardQueryParams extends PaginationParams {
    filters: DashboardFilters;
}

// Response type for filter options
export interface FilterOptionsResponse {
    getDistinctFilterOptions: DashboardFilterOptions;
}

// Response type for dashboard data
export interface DashboardDataResponse {
    getReportEtmDashboard: DashboardResponse;
}