import { gql } from '@apollo/client';

export const GET_DISTINCT_FILTER_OPTIONS = gql`
    query getDistinctFilterOptions {
        getDistinctFilterOptions {
            localidades
            bodegas
            regiones
            zonas
            ruta
            clasificaciones
            productos
            descripciones
            canal
        }
    }
`;

export const GET_ZONAS_FILTERED = gql`
      query GetZonasFiltered($filters: EtmDashboardFilterInput!) {
        getZonasFiltered(filters: $filters)
      }
    `;

export const GET_REGIONS_FILTERED = gql`
    query GetRegionsFiltered($filters: EtmDashboardFilterInput!) {
        getRegionsFiltered(filters: $filters)
    }
`;

export const GET_CLASIFICACION_FILTERED = gql`
    query GetClasificacionFiltered($filters: EtmDashboardFilterInput!) {
        getClasificacionFiltered(filters: $filters)
    }
`;

export const GET_RUTA_FILTERED = gql`
    query GetRutaFiltered($filters: EtmDashboardFilterInput!) {
        getRutaFiltered(filters: $filters)
    }
`;

export const GET_CANAL_FILTERED = gql`
    query GetCanalFiltered($filters: EtmDashboardFilterInput!) {
        getCanalFiltered(filters: $filters)
    }
`;

export const GET_BODEGA_FILTERED = gql`
    query GetBodegaFiltered($filters: EtmDashboardFilterInput!) {
        getIdBodegaFiltered(filters: $filters)
    }
`;

export const GET_IDBODEGA_FILTERED = gql`
    query GetIdBodegaFiltered($filters: EtmDashboardFilterInput!) {
        getIdBodegaFiltered(filters: $filters)
    }
`;

export const GET_CLAVELISTA_FILTERED = gql`
    query GetClaveListaFiltered($filters: EtmDashboardFilterInput!) {
        getClaveListaFiltered(filters: $filters)
    }
`;


