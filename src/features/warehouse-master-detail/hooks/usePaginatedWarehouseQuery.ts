import { useEffect, useState } from 'react';
import { dashboardService } from '../../../app/providers/services/dashboard.service';
import { useWarehouseTableStore  } from '../store/warehouseTableStore';


export function usePaginatedWarehouseQuery() {
    const { filters, page, pageSize, setTotal } = useWarehouseTableStore();
    const [rows, setRows] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [filterOptions, setFilterOptions] = useState<any>({});

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const data = await dashboardService.fetchDashboardData(page, pageSize, filters);
                setRows(data.items);
                setTotal(data.total);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [filters, page, pageSize]);

    useEffect(() => {
        async function fetchFilters() {
            try {
                const options = await dashboardService.fetchFilterOptions();
                setFilterOptions(options.getDistinctFilterOptions);
            } catch (error) {
                console.error('Error fetching filter options:', error);
            }
        }
            fetchFilters();
    }, []);
    return {
        rows,
        total: rows.length,
        loading,
        page,
        pageSize,
        filterOptions
      };
}