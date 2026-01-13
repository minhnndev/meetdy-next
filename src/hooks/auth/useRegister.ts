import { useMutation } from "@tanstack/react-query";
import { createQueryKey } from "@/queries/core";
import { TRegister } from "@/models/auth.model";
import ServiceAuth from "@/api/authApi";

export function useRegister() {
    return useMutation<void, unknown, TRegister>({
        mutationKey: createQueryKey("register", {}),
        mutationFn: (params: TRegister) => ServiceAuth.register(params),
    });
}
