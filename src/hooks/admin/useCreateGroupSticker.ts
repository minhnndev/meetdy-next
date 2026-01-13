import { useMutation } from "@tanstack/react-query";
import { createQueryKey } from "@/queries/core";
import ServiceAdmin from "@/api/adminApi";

export function useCreateGroupSticker() {
    return useMutation({
        mutationKey: createQueryKey("createGroupSticker", {}),
        mutationFn: async ({ name, description }: { name: string; description: string }) => {
            return await ServiceAdmin.createGroupSticker(name, description);
        },
    });
}
