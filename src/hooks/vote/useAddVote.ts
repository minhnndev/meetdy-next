import ServiceVote from "@/api/voteApi";
import { createQueryKey } from "@/queries/core";
import { useMutation } from "@tanstack/react-query";

export function useAddVote() {
    return useMutation<any, unknown, { messageId: string; options: string[] }>({
        mutationKey: createQueryKey("addVote", {}, {}),
        mutationFn: (params) => ServiceVote.addVote(params.messageId, params.options),
    });
}
