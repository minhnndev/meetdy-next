import { useMutation } from "@tanstack/react-query";
import { createQueryKey } from "@/queries/core";
import ServiceClassify from "@/api/classifyApi";
import { IAddClassify } from "@/models/classify.model";

export function useUpdateClassifyMutation() {
    return useMutation({
        mutationKey: createQueryKey("updateClassify", {}),
        mutationFn: async (params: { classifyId: string; data: IAddClassify }) => {
            const { classifyId, data } = params;
            return await ServiceClassify.updateClassify(classifyId, data);
        },
    });
}
