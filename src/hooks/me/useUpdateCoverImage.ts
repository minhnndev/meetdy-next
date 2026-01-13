import ServiceMe from "@/api/meApi";
import { ICoverImageResponse } from "@/models/me.model";
import { createQueryKey } from "@/queries/core";
import { useMutation } from "@tanstack/react-query";

export function useUpdateCoverImage() {
    return useMutation<ICoverImageResponse, unknown, FormData>({
        mutationKey: createQueryKey("updateCoverImage", {}),
        mutationFn: (data: FormData) => ServiceMe.updateCoverImage(data),
    });
}
