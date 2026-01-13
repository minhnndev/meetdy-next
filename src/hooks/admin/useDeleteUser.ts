import { useMutation } from "@tanstack/react-query";
import { createQueryKey } from "@/queries/core";
import ServiceAdmin from "@/api/adminApi";

export function useDeleteUser() {
    return useMutation({
        mutationKey: createQueryKey("deleteUser", {}),
        mutationFn: async ({ id, isDeleted }: { id: string; isDeleted: boolean }) => {
            return await ServiceAdmin.delete(id, isDeleted);
        },
    });
}
