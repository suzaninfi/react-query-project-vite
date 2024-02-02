import { UseQueryOptions } from "@tanstack/react-query";
import { DefaultError, QueryKey } from "@tanstack/query-core";

export type UseQueryHookOptions<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = Omit<
  UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  "queryKey" | "queryFn" | "staleTime" | "gcTime"
>;
