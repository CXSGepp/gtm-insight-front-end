import { gql } from "@apollo/client";

export const SKU_FIELDS = gql`
    fragment SkuFields on ReportGeppEtmSkusEntity {
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
        DB_ORIGEN
        SEMAFORO_GLOBAL
        LAST_UPDATED
    }
`;