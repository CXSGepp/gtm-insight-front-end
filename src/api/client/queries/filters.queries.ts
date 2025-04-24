// src/api/queries/filters.queries.ts
import { gql } from '@apollo/client';

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