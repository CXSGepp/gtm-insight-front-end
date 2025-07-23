import { useQueryClient, useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import { dashboardService } from '../../../app/providers/services/dashboard.service';
import { useWarehouseTableStore } from '../store/warehouseTableStore';

export function useWarehouseFilters() {
    const {
        filters,
        filterOptions,
        isFilterLoading,
        firstSelectedFilter,
        patchFilters,
        setFilterOptions,
        setFilterLoading,
        setFirstSelected,
        resetFilters,
        resetFirstSelected, 
    } = useWarehouseTableStore();

    const queryClient = useQueryClient();

    useQuery({
        queryKey: ['filter-options', 'initial'],
        queryFn: async () => {
            setFilterLoading(true);
            const opts = await dashboardService.fetchFilterOptions();
            setFilterOptions(opts);
            setFilterLoading(false);
            return opts;
        },
        staleTime: 1000 * 60 * 1000, // 1 hour
    });

    useQuery({ 
        queryKey: ['filter-options', firstSelectedFilter.key, firstSelectedFilter.value],
        enabled: !!firstSelectedFilter.key,
        queryFn: async () => {
            setFilterLoading(true);
            const opts = await dashboardService.fetchCascadingOptions(
                firstSelectedFilter.key!,
                firstSelectedFilter.value!,
            );
            setFilterOptions(opts);
            setFilterLoading(false);
            return opts;
        },
        staleTime: 1000 * 60 * 5,
    });

    const applyFilters = (payload: Record<string, any>) => {
        patchFilters(payload);
        if( firstSelectedFilter.key ) {
            resetFirstSelected();
        }
    }

    const resetAll = async () => {
        resetFilters();
        resetFirstSelected();
        await queryClient.invalidateQueries({ queryKey: ['filter-options', 'initial'] });

    }
        const onFilterChange = useCallback(
        (
            key: string,
            value: any,
            localFilters: Record<string, any>,
            setLocal: (f: Record<string, any>) => void,
        ) => {
            // Actualiza el estado local del formulario
            setLocal({ ...localFilters, [key]: value });
            
            // Si aún no se ha seleccionado un filtro para la cascada, establece este como el primero.
            if (!firstSelectedFilter.key) {
                setFirstSelected(key, value);
            }
        },
        [firstSelectedFilter.key, setFirstSelected],
    );

    return {
        filters,
        filterOptions,
        isLoading: isFilterLoading,
        applyFilters,
        resetAll,
        onFilterChange,
    };

}