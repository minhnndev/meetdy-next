import FriendService from "@/api/friendApi";
import { createQueryKey } from "@/queries/core";
import { useMutation } from "@tanstack/react-query";

export function useDeleteFriend() {
    return useMutation({
        mutationKey: createQueryKey("deleteFriend", {}),
        mutationFn: async (userId: string) => {
            return await FriendService.deleteFriend(userId);
        },
    });
}
