import { useMutation } from "@tanstack/react-query";
import { createQueryKey } from "@/queries/core";
import ServiceClassify from "@/api/classifyApi";

export function useDeleteClassify() {
    return useMutation({
        mutationKey: createQueryKey("deleteClassify", {}),
        mutationFn: async (id: string) => {
            return await ServiceClassify.deleteClassify(id);
        },
    });
}
