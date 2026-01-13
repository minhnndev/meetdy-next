import ServiceMe from "@/api/meApi";
import { IAvatarResponse } from "@/models/me.model";
import { createQueryKey } from "@/queries/core";
import { useMutation } from "@tanstack/react-query";

export function useUpdateAvatar() {
    return useMutation<IAvatarResponse, unknown, FormData>({
        mutationKey: createQueryKey("updateAvatar", {}),
        mutationFn: (data: FormData) => ServiceMe.updateAvatar(data),
    });
}
