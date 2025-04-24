// Base type for SKU items
export interface SkuItem {
    ID: number;
    CLIENTE: number;
    BODEGA: number;
    ID_PRODUCTO: string;
    DESCRIPCION: string;
    ACTIVO_OPM: boolean;
    ACTIVO_SIO: boolean;
    ACTIVO_HH: boolean;
    CANAL: string;
    LISTA_PRECIO: string;
    FECHA_REGISTRO: string;
    DATABASE: string;
    SEMAFORO_GLOBAL: string;
    LAST_UPDATED: string;
}

// Response type for SKU queries
export interface SkuResponse {
    items: SkuItem[];
    total: number;
    hasMore: boolean;
    page: number;
}

// Parameters for fetching SKUs
export interface SkuQueryParams {
    bodega: number;
    cliente?: number;
    filters: Record<string, any>; // Can be more specific if needed
    page: number;
    limit: number;
}

// Response type for SKU data
export interface SkuDataResponse {
    getSkusForRow: SkuResponse;
}

// Status types for SKU
export interface SkuStatus {
    opm: boolean;
    sio: boolean;
    hh: boolean;
}

// Extended SKU item with status
export interface SkuItemWithStatus extends SkuItem {
    status: SkuStatus;
}
