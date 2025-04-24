import { gql } from '@apollo/client';

export const ETM_DASHBOARD_FIELDS = gql`
    fragment EtmDashboardFields on EtmDashboard {
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

`;