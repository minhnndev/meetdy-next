import { useMutation } from "@tanstack/react-query";
import { createQueryKey } from "@/queries/core";
import ServiceAdmin from "@/api/adminApi";

export function useDeleteGroupSticker() {
    return useMutation({
        mutationKey: createQueryKey("deleteGroupSticker", {}),
        mutationFn: async (id: string) => {
            return await ServiceAdmin.deleteGroupSticker(id);
        },
    });
}
