import { useMutation } from "@tanstack/react-query";
import { createQueryKey } from "@/queries/core";
import { TConfirmPassword } from "@/models/auth.model";
import ServiceAuth from "@/api/authApi";

export function useConfirmPassword() {
    return useMutation<void, unknown, TConfirmPassword>({
        mutationKey: createQueryKey("confirmPassword", {}),
        mutationFn: (params: TConfirmPassword) => ServiceAuth.confirmPassword(params),
    });
}
