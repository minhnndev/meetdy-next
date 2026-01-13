import FriendService from "@/api/friendApi";
import { createQueryKey } from "@/queries/core";
import { useMutation } from "@tanstack/react-query";

export function useDeleteRequestFriend() {
    return useMutation({
        mutationKey: createQueryKey("deleteRequestFriend", {}),
        mutationFn: async (userId: string) => {
            return await FriendService.deleteRequestFriend(userId);
        },
    });
}
