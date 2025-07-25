import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '../../../app/providers/services/dashboard.service';

export function useIdClientSearch(searchTerm: string) {
  const numericSearchTerm = parseInt(searchTerm, 10);

  const { data, isLoading } = useQuery({
    queryKey: ['clientIdSearch', searchTerm],
 
    queryFn: () => dashboardService.searchClientId(numericSearchTerm),
    
    enabled: !!searchTerm && !isNaN(numericSearchTerm),
    
    staleTime: 1000 * 60 * 5,
    
    refetchOnWindowFocus: false,
  });

  return { options: data, loading: isLoading };
}