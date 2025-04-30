export const validatePaginationParams = (page: number, limit: number) => ({
    page: Math.max(0, page),
    limit: Math.min(Math.max(1, limit), 100)

});

