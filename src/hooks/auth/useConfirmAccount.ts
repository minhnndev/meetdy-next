import { useMutation } from "@tanstack/react-query";
import { createQueryKey } from "@/queries/core";
import { TConfirmAccount } from "@/models/auth.model";
import ServiceAuth from "@/api/authApi";

export function useConfirmAccount() {
    return useMutation<void, unknown, TConfirmAccount>({
        mutationKey: createQueryKey("confirmAccount", {}),
        mutationFn: (params: TConfirmAccount) => ServiceAuth.confirmAccount(params),
    });
}
