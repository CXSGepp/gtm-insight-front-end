import { InMemoryCache } from '@apollo/client';
import { offsetLimitPagination } from '@apollo/client/utilities';


export const createCacheConfig = () => new InMemoryCache({ 
    typePolicies: {
        Query: {
            fields: {
                getReportEtmDashboard: offsetLimitPagination(['filters']),
            }
        }
    }
})