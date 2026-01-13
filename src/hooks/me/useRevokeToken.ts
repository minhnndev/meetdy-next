import ServiceMe from "@/api/meApi";
import { IRevokeTokenResponse, TRevokeToken } from "@/models/me.model";
import { createQueryKey } from "@/queries/core";
import { useMutation } from "@tanstack/react-query";

export function useRevokeToken() {
    return useMutation<IRevokeTokenResponse, unknown, TRevokeToken>({
        mutationKey: createQueryKey("revokeToken", {}),
        mutationFn: (params: TRevokeToken) => ServiceMe.revokeToken(params),
    });
}
