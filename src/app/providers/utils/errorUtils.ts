import { ApolloError } from '@apollo/client';

/* ---------- Domain-specific error object ---------- */
export class ApiError extends Error {
  /** GraphQL error-code or a custom tag */
  code: string;
  /** HTTP status if known (otherwise 500) */
  status: number;

  constructor(message: string, code = 'UNEXPECTED_ERROR', status = 500) {
    super(message);
    this.name   = 'ApiError';
    this.code   = code;
    this.status = status;
  }
}

/* ---------- One canonical entry-point ---------- */
export const handleApiError = (err: unknown): never => {
  /* already wrapped -> bubble up unchanged */
  if (err instanceof ApiError) {
    throw err;
  }

  /* ─────────────  Apollo errors  ───────────── */
  if (err instanceof ApolloError) {
    /** messages returned in the GraphQL `errors` array */
    const graphQLMessages = err.graphQLErrors?.map(e => e.message) ?? [];

    /** When the server replied 4xx|5xx Apollo places errors here */
    const netErr = (err.networkError as any) ?? {};
    const netMessages: string[] =
      netErr?.result?.errors?.map((e: any) => e.message) ?? [];

    const allMessages = [...graphQLMessages, ...netMessages];

    /* build a single human-readable message */
    const message = allMessages.length
      ? allMessages.join(' • ')
      : 'Network / GraphQL error';

    /* try to grab a meaningful status code, otherwise → 500 */
    const status =
      netErr?.statusCode ??
      (typeof netErr?.status === 'number' ? netErr.status : 500);

    /* use the first GraphQL “extensions.code” if available */
    const code =
      err.graphQLErrors?.[0]?.extensions?.code ??
      (netErr?.result?.errors?.[0]?.extensions?.code ?? 'GRAPHQL_ERROR');

    throw new ApiError(message, code, status);
  }

  /* ─────────────  Fallback: anything else  ───────────── */
  throw new ApiError(
    (err as Error)?.message || 'An unexpected error occurred',
    'UNEXPECTED_ERROR',
    500,
  );
};
