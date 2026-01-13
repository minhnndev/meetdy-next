import ServiceMe from "@/api/meApi";
import { TUpdateProfile } from "@/models/me.model";
import { createQueryKey } from "@/queries/core";
import { useMutation } from "@tanstack/react-query";

export function useUpdateProfile() {
    return useMutation<void, unknown, TUpdateProfile>({
        mutationKey: createQueryKey("updateProfile", {}),
        mutationFn: (params: TUpdateProfile) => ServiceMe.updateProfile(params),
    });
}
