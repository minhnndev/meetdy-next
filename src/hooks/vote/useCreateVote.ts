import ServiceVote from "@/api/voteApi";
import { createQueryKey } from "@/queries/core";
import { useMutation } from "@tanstack/react-query";

export function useCreateVote() {
    return useMutation<
        any,
        unknown,
        { content: string; options: string[]; conversationId: string }
    >({
        mutationKey: createQueryKey("createVote", {}, {}),
        mutationFn: (params) =>
            ServiceVote.createVote(params.content, params.options, params.conversationId),
    });
}
