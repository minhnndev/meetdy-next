import FriendService from "@/api/friendApi";
import { createQueryKey } from "@/queries/core";
import { useMutation } from "@tanstack/react-query";

export function useDeleteSentRequestFriend() {
    return useMutation({
        mutationKey: createQueryKey("deleteSentRequestFriend", {}),
        mutationFn: async (userId: string) => {
            return await FriendService.deleteSentRequestFriend(userId);
        },
    });
}
