import ServiceVote from "@/api/voteApi";
import { createQueryKey } from "@/queries/core";
import { useMutation } from "@tanstack/react-query";

export function useSelectVote() {
    return useMutation<any, unknown, { messageId: string; options: string[] }>({
        mutationKey: createQueryKey("selectVote", {}, {}),
        mutationFn: (params) => ServiceVote.selectVote(params.messageId, params.options),
    });
}
