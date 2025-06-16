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
    }

`;