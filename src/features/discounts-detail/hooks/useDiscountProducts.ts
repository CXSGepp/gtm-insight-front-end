import { useQuery } from '@tanstack/react-query';
import { discountService } from '../../../app/providers/services/discount.service';
import { DiscProductsQueryParams } from '../../../shared/types/discount.types';

export function useDiscountProductsQuery(params: DiscProductsQueryParams) {
  // La consulta solo debe ejecutarse si tenemos los parámetros OBLIGATORIOS.
  // 'cliente' es opcional, pero 'bodega' y 'id_desc' son necesarios.
  const enabled = !!params.bodega && !!params.id_desc;

  return useQuery({
    queryKey: ['discount-products', params],
    queryFn: () => discountService.fetchDiscountProductsForRow(params),
    enabled, // Usamos la variable 'enabled' que acabamos de definir
    // keepPreviousData: true, // Puedes quitarlo si no quieres ver datos viejos mientras carga
    staleTime: 5 * 60 * 1000,
  });
}