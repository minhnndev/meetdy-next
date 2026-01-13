import ServiceMessages from "@/api/messageApi";
import { createQueryKey } from "@/queries/core";
import { useMutation } from "@tanstack/react-query";

export function useSendTextMessage() {
    return useMutation<void, unknown, { content: string; conversationId: string; replyMessageId?: string }>({
        mutationKey: createQueryKey("sendTextMessage", {}),
        mutationFn: (message) => ServiceMessages.sendTextMessage(message),
    });
}
