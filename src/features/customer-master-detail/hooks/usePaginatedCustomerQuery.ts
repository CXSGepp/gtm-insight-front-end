import { useEffect, useState } from 'react';
import { dashboardService } from '../../../app/providers/services/dashboard.service';
import { useCustomerTableStore } from '../store/customerTableStore';


export function usePaginatedCustomerQuery() {
    const { filters, page, pageSize, setTotal } = useCustomerTableStore();
    const [rows, setRows] = useState<any>([]);
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
    }, [filters, page, pageSize, setTotal]);

    useEffect(() => {
        async function fetchFilters() {
            try{
                const options = await dashboardService.fetchFilterOptions();
                setFilterOptions(options.getDistinctFilterOptions);
            } catch (error) {
                console.error('Error loading filter options', error);
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
        filterOptions,
    };
}