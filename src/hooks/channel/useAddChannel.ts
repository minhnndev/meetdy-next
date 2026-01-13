import { useMutation } from "@tanstack/react-query";
import { createQueryKey } from "@/queries/core";
import ServiceChannel from "@/api/channelApi";

export function useAddChannel() {
    return useMutation({
        mutationKey: createQueryKey("addChannel", {}),
        mutationFn: async ({ name, conversationId }: { name: string; conversationId: string }) => {
            return await ServiceChannel.addChannel(name, conversationId);
        },
    });
}
