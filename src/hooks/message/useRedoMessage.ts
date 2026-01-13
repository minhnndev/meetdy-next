import ServiceMessages from "@/api/messageApi";
import { createQueryKey } from "@/queries/core";
import { useMutation } from "@tanstack/react-query";

export function useRedoMessage() {
    return useMutation<void, unknown, string>({
        mutationKey: createQueryKey("redoMessage", {}),
        mutationFn: (idMessage) => ServiceMessages.redoMessage(idMessage),
    });
}
