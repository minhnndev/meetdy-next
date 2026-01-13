import { useMutation } from "@tanstack/react-query";
import { createQueryKey } from "@/queries/core";
import ServiceAdmin from "@/api/adminApi";

export function useDeleteSticker() {
    return useMutation({
        mutationKey: createQueryKey("deleteSticker", {}),
        mutationFn: async ({ id, url }: { id: string; url: string }) => {
            return await ServiceAdmin.deleteSticker(id, url);
        },
    });
}
