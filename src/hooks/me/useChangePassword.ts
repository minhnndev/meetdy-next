import ServiceMe from "@/api/meApi";
import { IChangePassword } from "@/models/me.model";
import { createQueryKey } from "@/queries/core";
import { useMutation } from "@tanstack/react-query";

export function useChangePassword() {
    return useMutation<void, unknown, IChangePassword>({
        mutationKey: createQueryKey("changePassword", {}),
        mutationFn: (params: IChangePassword) => ServiceMe.changePassword(params),
    });
}
