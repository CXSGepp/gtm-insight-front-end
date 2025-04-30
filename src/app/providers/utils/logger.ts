export const logApiRequest = (operation: string, params: Record<string, any>) => {
    console.log(`[API] ${operation}:`, params);
};

export const logApiError = (operation: string, error: Error) => {
    console.error(`[API Error] ${operation}:`, error);
};