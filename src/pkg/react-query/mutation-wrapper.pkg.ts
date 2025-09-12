import { MutationOptions, useMutation } from "@tanstack/react-query";
import { TResponse } from "./mutation-wrapper.type";

export function useMutationWrapper<TInput, TData>(options: MutationOptions<TResponse<TData>, TResponse<null>, TInput>) {
    return useMutation<TResponse<TData>, TResponse<null>, TInput>(options);
}
