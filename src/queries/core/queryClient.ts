import { QueryClient } from "@tanstack/react-query";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { PersistQueryClientOptions } from "@tanstack/react-query-persist-client";

const STALE_TIME = 1000 * 60 * 5;
const CACHE_TIME = 1000 * 60;
//Let's assume we are using the default `gcTime` of 5 minutes and the default staleTime of 0. v5

export const queryClient = new QueryClient({
    defaultOptions: {
        mutations: {
            retry: false,
            meta: {
                preventGlobalError: true,
            },
            throwOnError: false,
        },
        queries: {
            staleTime: STALE_TIME,
            gcTime: CACHE_TIME,
            retry: 1,
        },
    },
});

const asyncStoragePersister = createSyncStoragePersister({
    key: "react-query-persist",
    storage: localStorage,
});

export const persistOptions: Omit<PersistQueryClientOptions, "queryClient"> = {
    persister: asyncStoragePersister,
    dehydrateOptions: {
        shouldDehydrateQuery: (query: any) =>
            Boolean(
                // We want to persist queries that have a `cacheTime` of above zero.
                query.gcTime !== 0 &&
                    // We want to persist queries that have `persisterVersion` in their query key.
                    (query.queryKey[2] as { persisterVersion?: number })?.persisterVersion
            ),
    },
};
