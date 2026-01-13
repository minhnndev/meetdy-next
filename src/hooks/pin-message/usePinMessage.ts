import ServicePinMessage from "@/api/pinMessageApi";
import { createQueryKey } from "@/queries/core";
import { useMutation } from "@tanstack/react-query";

export function usePinMessage() {
    return useMutation<void, unknown, string>({
        mutationKey: createQueryKey("pinMessage", {}),
        mutationFn: (messageId: string) => ServicePinMessage.pinMessage(messageId),
    });
}
