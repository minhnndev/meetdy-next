import { useMutation } from "@tanstack/react-query";
import { createQueryKey } from "@/queries/core";
import ServiceAdmin from "@/api/adminApi";

export function useAddSticker() {
    return useMutation({
        mutationKey: createQueryKey("addSticker", {}),
        mutationFn: async ({ id, file }: { id: string; file: File }) => {
            return await ServiceAdmin.addSticker(id, file);
        },
    });
}
