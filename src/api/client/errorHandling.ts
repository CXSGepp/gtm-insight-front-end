import { onError, ErrorResponse } from "@apollo/client/link/error";
import { GraphQLError } from "graphql";


interface FormattedGraphQLError {
    message: string;
    code?: string;
    path?: readonly (string | number)[];
    timestamp: string;
}

const formatGraphQLError = (error: GraphQLError): FormattedGraphQLError => ({
    message: error.message,
    code: error.extensions?.code as string,
    path: error.path,
    timestamp: new Date().toISOString()
});

export const errorLink = onError(({
    graphQLErrors,
    networkError,
    operation
    }: ErrorResponse) => {
    if (graphQLErrors) {
        graphQLErrors.forEach((error) => {
            const formattedError = formatGraphQLError(error);
            console.log(`[GraphQL error ]`, formattedError);
        });
    }
    if (networkError) {
        console.log(`[Network Error]`, {
            message: networkError.message,
            operation: operation.operationName,
            timestamp: new Date().toISOString()
        });
    }
});
