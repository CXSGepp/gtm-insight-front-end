import { useMemo } from "react";
import { useDashboardData } from "./useDashboardData";

export const useFilterOptions = () => {
  const { data } = useDashboardData();

  return useMemo(() => {
    const options = {
      REGION: new Set<string>(),
      ZONA: new Set<string>(),
      BODEGA: new Set<number>(),
      TIPO_RUTA: new Set<string>(),
      CLASIFICACION: new Set<string>(),
    };

    data.forEach((item) => {
      if (item.REGION) options.REGION.add(item.REGION);
      if (item.ZONA) options.ZONA.add(item.ZONA);
      if (item.BODEGA) options.BODEGA.add(item.BODEGA);
      if (item.TIPO_RUTA) options.TIPO_RUTA.add(item.TIPO_RUTA);
      if (item.CLASIFICACION) options.CLASIFICACION.add(item.CLASIFICACION);
    });

    return {
      REGION: Array.from(options.REGION).sort(),
      ZONA: Array.from(options.ZONA).sort(),
      BODEGA: Array.from(options.BODEGA).sort((a, b) => a - b),
      TIPO_RUTA: Array.from(options.TIPO_RUTA).sort(),
      CLASIFICACION: Array.from(options.CLASIFICACION).sort(),
    };
  }, [data]);
};
