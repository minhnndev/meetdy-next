import ServiceMessages from "@/api/messageApi";
import { createQueryKey } from "@/queries/core";
import { useMutation } from "@tanstack/react-query";

export function useForwardMessage() {
    return useMutation<void, unknown, { messageId: string; conversationId: string }>({
        mutationKey: createQueryKey("forwardMessage", {}),
        mutationFn: ({ messageId, conversationId }) =>
            ServiceMessages.forwardMessage(messageId, conversationId),
    });
}
