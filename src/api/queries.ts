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
