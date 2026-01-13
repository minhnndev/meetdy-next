import { useMutation } from "@tanstack/react-query";
import { createQueryKey } from "@/queries/core";
import ServiceAdmin from "@/api/adminApi";

export function useActiveUser() {
    return useMutation({
        mutationKey: createQueryKey("activeUser", {}),
        mutationFn: async ({ id, isActived }: { id: string; isActived: boolean }) => {
            return await ServiceAdmin.active(id, isActived);
        },
    });
}
