// src/shared/types/discount.types.ts
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
}

export interface DiscountResponse {
  items: DiscountItem[];
  total: number;
  hasMore: boolean;
  page: number; // Client-side pagination
}

export interface DiscountQueryParams {
  bodega: number;
  cliente?: number;
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