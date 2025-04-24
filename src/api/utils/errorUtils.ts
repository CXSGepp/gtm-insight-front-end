// src/api/utils/errorUtils.ts
export class ApiError extends Error {
    constructor(
        message: string,
        public code: string,
        public status: number
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

export const handleApiError = (error: unknown): never => {
    if (error instanceof ApiError) throw error;
    throw new ApiError(
        'An unexpected error occurred',
        'UNEXPECTED_ERROR',
        500
    );
};