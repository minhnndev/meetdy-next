import { useMutation } from "@tanstack/react-query";
import { createQueryKey } from "@/queries/core";
import ServiceChannel from "@/api/channelApi";

export function useDeleteChannel() {
    return useMutation({
        mutationKey: createQueryKey("deleteChannel", {}),
        mutationFn: async (channelId: string) => {
            return await ServiceChannel.deleteChannel(channelId);
        },
    });
}
