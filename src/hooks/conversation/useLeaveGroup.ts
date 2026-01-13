import { useMutation } from "@tanstack/react-query";
import { createQueryKey } from "@/queries/core";
import ServiceConversation from "@/api/conversationApi";

export function useLeaveGroup() {
    return useMutation<void, unknown, string>({
        mutationKey: createQueryKey("leaveGroup", {}),
        mutationFn: (conversationId: string) => ServiceConversation.leaveGroup(conversationId),
    });
}
