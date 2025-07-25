import { gql } from '@apollo/client';

export const ETM_DASHBOARD_FIELDS = gql`
    fragment DashboardFields on ReportGeppEtmEntity {
    ID
    REGION
    ZONA
    LOCALIDAD
    ID_BODEGA
    RUTA
    CLIENTE
    NOMBRE
    TIPO_RUTA
    CLASIFICACION
    FRECUENCIA
    CLAVE_LISTA
    CANAL
    ACTIVA
    TELEFONO
    DIRECCION
    LAST_UPDATED
    PRG_LEALTAD
    }

`;

export const ETM_DASHBOARD_FIELDS_WAREHOUSE = gql`
    fragment DashboardFieldsWarehouse on ReportGeppWarehouseEtmEntity { 
    ID 
    BODEGA
    UOPM
    REGION
    ZONA
    LOCALIDAD
    RUTA
    TIPO_RUTA
    CLAVE_LISTA
    ACTIVA
    CLASIFICACION
    LAST_UPDATED
    CANAL
    }

`;