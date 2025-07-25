import { gql } from "@apollo/client";

export const SKU_FIELDS = gql`
    fragment SkuFields on ReportGeppEtmSkusEntity {
        ID
        ID_BODEGA
        ID_PRODUCTO
        DESCRIPCION
        ACTIVO_OPM
        ACTIVO_SIO
        ACTIVO_HH
        DB_ORIGEN
        SEMAFORO_GLOBAL
    }
`;