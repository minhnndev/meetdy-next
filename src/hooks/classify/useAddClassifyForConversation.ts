import ServiceClassify from "@/api/classifyApi";
import { createQueryKey } from "@/queries/core";
import { useMutation } from "@tanstack/react-query";

export function useAddClassifyForConversation() {
    return useMutation({
        mutationKey: createQueryKey("addClassifyForConversation", {}),
        mutationFn: async (params: { classifyId: string; conversationId: string }) => {
            const { classifyId, conversationId } = params;
            return await ServiceClassify.addClassifyForConversation(classifyId, conversationId);
        },
    });
}
