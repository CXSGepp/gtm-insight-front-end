export interface PaginationProps {
    page: number,
    pageSize: number,
    totalItems: number,
    onPageChange: (page: number, pageSize: number ) => void;
    rowsPerPageOptions?: number[];
}