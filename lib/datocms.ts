import { executeQuery } from '@datocms/cda-client';

export const performRequest = <Result = unknown>(query: Parameters<typeof executeQuery>[0], options?: Parameters<typeof executeQuery>[1]) => {
    return executeQuery<Result>(query, {
        ...options,
        token: process.env.NEXT_DATOCMS_API_TOKEN as string,
        environment: process.env.NEXT_DATOCMS_ENVIRONMENT as string,
    });
};
