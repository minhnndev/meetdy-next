import { useMutation } from "@tanstack/react-query";
import ServiceAuth from "@/api/authApi";
import { createQueryKey } from "@/queries/core";
import { TLogin, TLoginResponse } from "@/models/auth.model";

export function useLogin() {
    return useMutation<TLoginResponse, unknown, TLogin>({
        mutationKey: createQueryKey("login", {}),
        mutationFn: (params: TLogin) => ServiceAuth.login(params),
    });
}
