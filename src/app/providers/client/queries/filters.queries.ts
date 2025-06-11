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