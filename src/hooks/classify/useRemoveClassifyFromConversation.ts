import ServiceClassify from "@/api/classifyApi";
import { createQueryKey } from "@/queries/core";
import { useMutation } from "@tanstack/react-query";

export function useRemoveClassifyFromConversation() {
    return useMutation({
        mutationKey: createQueryKey("removeClassifyFromConversation", {}),
        mutationFn: async (params: { classifyId: string; conversationId: string }) => {
            const { classifyId, conversationId } = params;
            return await ServiceClassify.removeClassifyFromConversation(classifyId, conversationId);
        },
    });
}
