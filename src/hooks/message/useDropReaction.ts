import ServiceMessages from "@/api/messageApi";
import { createQueryKey } from "@/queries/core";
import { useMutation } from "@tanstack/react-query";

export function useDropReaction() {
    return useMutation<void, unknown, { idMessage: string; type: string }>({
        mutationKey: createQueryKey("dropReaction", {}),
        mutationFn: ({ idMessage, type }) => ServiceMessages.dropReaction(idMessage, type),
    });
}
