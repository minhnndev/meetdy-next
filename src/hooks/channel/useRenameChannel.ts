import { useMutation } from "@tanstack/react-query";
import { createQueryKey } from "@/queries/core";
import ServiceChannel from "@/api/channelApi";

export function useRenameChannel() {
    return useMutation({
        mutationKey: createQueryKey("renameChannel", {}),
        mutationFn: async ({ name, _id }: { name: string; _id: string }) => {
            return await ServiceChannel.renameChannel(name, _id);
        },
    });
}
