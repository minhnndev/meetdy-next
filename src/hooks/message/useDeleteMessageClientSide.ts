import ServiceMessages from "@/api/messageApi";
import { createQueryKey } from "@/queries/core";
import { useMutation } from "@tanstack/react-query";

export function useDeleteMessageClientSide() {
    return useMutation<void, unknown, string>({
        mutationKey: createQueryKey("deleteMessageClientSide", {}),
        mutationFn: (idMessage) => ServiceMessages.deleteMessageClientSide(idMessage),
    });
}
