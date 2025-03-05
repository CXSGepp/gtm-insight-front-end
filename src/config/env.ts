export const env = { 
    apiUrl: import.meta.env.VITE_API_URL,
    graphqlEndpoint: import.meta.env.VITE_GRAPHQL_ENDPOINT,
    graphqlUrl: `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_GRAPHQL_ENDPOINT}`
} as const;

const requiredEnvVars = ['apiUrl', 'graphqlEndpoint'] as const;
requiredEnvVars.forEach((envVar) => {
    if (!env[envVar]) {
        throw new Error(`Missing required environment variable: ${envVar}`);
    }
})