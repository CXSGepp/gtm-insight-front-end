// src/app/providers/client/queries/fragments/discount.fragment.ts
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
  }
`;