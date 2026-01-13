import ServiceVote from "@/api/voteApi";
import { createQueryKey } from "@/queries/core";
import { useMutation } from "@tanstack/react-query";

export function useDeleteSelect() {
    return useMutation<any, unknown, { messageId: string; options: string[] }>({
        mutationKey: createQueryKey("deleteSelect", {}, {}),
        mutationFn: (params) => ServiceVote.deleteSelect(params.messageId, params.options),
    });
}
