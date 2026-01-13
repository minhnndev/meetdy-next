import FriendService from "@/api/friendApi";
import { createQueryKey } from "@/queries/core";
import { useMutation } from "@tanstack/react-query";

export function useAcceptRequestFriend() {
    return useMutation({
        mutationKey: createQueryKey("acceptRequestFriend", {}),
        mutationFn: async (userId: string) => {
            return await FriendService.acceptRequestFriend(userId);
        },
    });
}
