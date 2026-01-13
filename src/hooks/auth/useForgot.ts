import { useMutation } from "@tanstack/react-query";
import { createQueryKey } from "@/queries/core";
import ServiceAuth from "@/api/authApi";

export function useForgot() {
    return useMutation<void, unknown, string>({
        mutationKey: createQueryKey("forgotPassword", {}),
        mutationFn: (username: string) => ServiceAuth.forgot(username),
    });
}
