import { InMemoryCache } from '@apollo/client';


export const createCacheConfig = () => new InMemoryCache({ 
    typePolicies: {
        Query: {
            fields: {
                getReportEtmDashboard: {
                    keyArgs: ['filters'],
                    merge(existing, incoming) {
                        if (!existing) return incoming;
                        return {
                            ...incoming,
                            items: [...existing.items, ...incoming.items]
                        }
                    }
                }
            }
        }
    }
})