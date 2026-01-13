import { useMutation } from "@tanstack/react-query";
import { createQueryKey } from "@/queries/core";
import ServiceAdmin from "@/api/adminApi";

export function useUpdateGroupSticker() {
    return useMutation({
        mutationKey: createQueryKey("updateGroupSticker", {}),
        mutationFn: async ({
            id,
            name,
            description,
        }: {
            id: string;
            name: string;
            description: string;
        }) => {
            return await ServiceAdmin.updateGroupSticker(id, name, description);
        },
    });
}
