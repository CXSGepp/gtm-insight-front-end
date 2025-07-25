import { gql } from "@apollo/client";

export const DISCOUNT_FIELDS = gql`
  fragment DiscountFields on ReportEtmDiscountEntity {
    DESCID
    IDDESCUENTOMSIO
    DESCNAME
    EXCLUSIVOTLV
    EXCLUSIVOGETM
    EXCLUSIVOGETMW
    EXCLUSIVOMPEP
    EXCLUSIVOMPEPW
    EXCLUSIVOHHC
    EXCLUSIVOTODOS
    DESCRIPCIONECOM
    FECHASTART
    FECHAEND
    IDCLIENTE
    ID_BODEGA
    VIGENTE
    MAXNUM
  }
`;

export const DISC_PRODUCTS_FIELDS = gql`
  fragment DiscountProductsFields on ReportEtmDiscProductsEntity {
    ID_DESC
    ID_BODEGA
    ID_CLIENTE
    NIVEL
    ID_PRODUCTO
    DESCRIPCION
    ACTIVO_OPM
    ACTIVO_SIO
    ACTIVO_HH
    SEMAFORO_GLOBAL
    DB_ORIGEN
    TIPO_MERCADO
    CLAVE_LISTA
    VIGENCIA_LISTA
    FECHASTART
    FECHAEND
  }
`;