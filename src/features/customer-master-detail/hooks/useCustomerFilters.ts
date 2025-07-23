import { useQueryClient, useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import { dashboardService } from '../../../app/providers/services/dashboard.service';
import { useCustomerDashboardStore } from '../store/customerTableStore';

export function useCustomerFilters() {
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
        // Importante: Necesitamos la función para resetear el filtro en cascada
        resetFirstSelected, 
    } = useCustomerDashboardStore();

    const queryClient = useQueryClient();

    /* Initial load for options */
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

    /* Cascading with fetch options */
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

    /* Public Helpers */

    /**
     * Aplica los filtros locales al estado global y resetea la lógica de cascada.
     * Esta es la función clave que se llama al hacer clic en "Aplicar".
     */
    const applyFilters = (payload: Record<string, any>) => {
        // 1. Aplica TODOS los filtros del payload (incluyendo 'cliente') al estado global.
        patchFilters(payload);
        
        // 2. Resetea el 'firstSelectedFilter' para que la próxima selección
        //    pueda iniciar una nueva cascada si es necesario.
        if (firstSelectedFilter.key) {
            resetFirstSelected();
        }
    };

    const resetAll = async () => {
        resetFilters();
        // Al resetear todo, también reseteamos el filtro en cascada.
        resetFirstSelected(); 
        await queryClient.invalidateQueries({ queryKey: ['filter-options', 'initial'] });
    };

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