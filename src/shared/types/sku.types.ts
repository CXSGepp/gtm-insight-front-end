import { DashboardFilters } from "./dashboard.types";

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
    DB_ORIGEN: string;
    SEMAFORO_GLOBAL: string;
    LAST_UPDATED: string;
  }
  
  export interface SkuResponse {
    items: SkuItem[];
    total: number;
    hasMore: boolean;
    page: number;
  }
  
  export interface SkuQueryParams {
    bodega: number;
    cliente?: number;
    claveLista?: number;
    page: number;
    limit: number;
  }
  
  export interface SkuDataResponse {
    getSkusForRow: SkuResponse;
  }
  
  export interface SkuStatus {
    opm: boolean;
    sio: boolean;
    hh: boolean;
  }
  
  export interface SkuItemWithStatus extends SkuItem {
    status: SkuStatus;
  }
  