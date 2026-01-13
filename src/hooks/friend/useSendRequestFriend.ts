import { useMutation } from "@tanstack/react-query";
import { createQueryKey } from "@/queries/core";
import FriendService from "@/api/friendApi";

export function useSendRequestFriend() {
    return useMutation({
        mutationKey: createQueryKey("sendRequestFriend", {}),
        mutationFn: async (userId: string) => {
            return await FriendService.sendRequestFriend(userId);
        },
    });
}
