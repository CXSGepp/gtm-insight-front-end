import { gql } from '@apollo/client';

export const GET_REPORT_ETM_DASHBOARD = gql`
    query getReportEtmDashboard(
    $page: Int, 
    $limit: Int, 
    $filters: EtmDashboardFilterInput) {
        getReportEtmDashboard(page: $page, limit: $limit, filters: $filters) {
            items {
                ID
                REGION
                ZONA
                LOCALIDAD
                BODEGA
                RUTA
                CLIENTE
                NOMBRE
                TIPO_RUTA
                CLASIFICACION
                FRECUENCIA
                CLAVE_LISTA
                ACTIVA
                TELEFONO
                DIRECCION
                LAST_UPDATED
            }
            total
            hasMore
            page
        }          
    }
`;

export const GET_DISTINCT_FILTER_OPTIONS = gql`
  query getDistinctFilterOptions {
    getDistinctFilterOptions {
      clientes
      telefonos
      regiones
      zonas
      bodegas
      tiposruta
      clasificaciones
      
    }
  }
`;

export const GET_SKUS_FOR_ROW = gql`
  query getSkusForRow(
    $page: Int,
    $limit: Int,
    $filters: EtmDashboardFilterInput,
    $bodega: Int!,
    $cliente: Int
  ) {
    getSkusForRow(
      page: $page,
      limit: $limit,
      filters: $filters,
      bodega: $bodega,
      cliente: $cliente
    ) {
      items {
        ID
        CLIENTE
        BODEGA
        ID_PRODUCTO
        DESCRIPCION
        ACTIVO_OPM
        ACTIVO_SIO
        ACTIVO_HH
        CANAL
        LISTA_PRECIO
        FECHA_REGISTRO
        DATABASE
        SEMAFORO_GLOBAL
        LAST_UPDATED
      }
      total
      hasMore
      page
    }
  }
`;
