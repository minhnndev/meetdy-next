import { useMutation } from "@tanstack/react-query";
import { createQueryKey } from "@/queries/core";
import ServiceClassify from "@/api/classifyApi";
import { IAddClassify } from "@/models/classify.model";

export function useAddClassify() {
    return useMutation({
        mutationKey: createQueryKey("addClassify", {}),
        mutationFn: async (params: IAddClassify) => {
            return await ServiceClassify.addClassify(params);
        },
    });
}
