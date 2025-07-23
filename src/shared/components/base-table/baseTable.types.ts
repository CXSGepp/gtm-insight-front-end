import { ColumnDef } from '@tanstack/react-table';

export interface BaseTableProps<TData> {
    columns: ColumnDef<TData, any>[];
    data: TData[];
    loading?: boolean;
    totalItems?: number;
    pageIndex: number;
    pageSize: number;
    onPaginationChange: (pageIndex: number, pageSize: number)  => void;
    expandableRowContent?: (row: TData) => React.ReactNode;
    getRowId?: (row: TData) => string;
    onRowClick?: (row: T) => void; 
    darkMode?: boolean;
}