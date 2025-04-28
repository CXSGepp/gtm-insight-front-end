import { gql } from "@apollo/client";

export const SKU_FIELDS = gql`
    fragment SkuFields on Sku {
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
`;