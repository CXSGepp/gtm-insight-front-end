export interface DiscountItem {
  DESCID: number;
  IDDESCUENTOMSIO: number;
  DESCNAME: string;
  EXCLUSIVOTLV: number;
  EXCLUSIVOGETM: number;
  EXCLUSIVOGETMW: number;
  EXCLUSIVOMPEP: number;
  EXCLUSIVOMPEPW: number;
  EXCLUSIVOHHC: number;
  EXCLUSIVOTODOS: number;
  DESCRIPCIONECOM: string;
  FECHASTART: string;
  FECHAEND: string;
  IDCLIENTE: number;
  ID_BODEGA: number;
  VIGENTE: number;
  MAXNUM: number;
}

export interface DiscProductItem {
  ID_DESC: number;
  ID_BODEGA: number;
  ID_NIVEL: number;
  ID_PRODUCTO: number;
  DESCRIPCION: string;
  ACTIVO_OPM: number;
  ACTIVO_SIO: number;
  ACTIVO_HH: number;
  SEMAFORO_GLOBAL: number;
  DB_ORIGEN: string;
  TIPO_MERCADO: number;
  CLAVE_LISTA: string;
  VIGENCIA_LISTA: number;
  FECHASTART: string;
  FECHAEND: string;
  
}

export interface DiscountResponse <T> {
  items: T[];
  total: number;
  hasMore: boolean;
  page: number; // Client-side pagination
}

export interface DiscProductResponse <T> {
  items: T[];
  total: number;
  hasMore: boolean;
  page: number; // Client-side pagination
}



export interface DiscountQueryParams {
  discountId?: number;
  bodega: number;
  cliente?: number;
  page: number;
  limit: number;
}

export interface DiscProductsQueryParams {
  bodega: number;
  id_desc?: number;
  page: number;
  limit: number;
}

export interface DiscountDataResponse {
  getDiscountsForRow: {
    items: DiscountItem[];
    total: number;
    hasMore: boolean;
  };
}