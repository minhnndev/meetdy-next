import ServiceMessages, { IAttachInfo } from "@/api/messageApi";
import { createQueryKey } from "@/queries/core";
import { useMutation } from "@tanstack/react-query";

export function useSendFileThroughMessage() {
    return useMutation<
        void,
        unknown,
        { file: File; attachInfo: IAttachInfo; onProgress: (progress: number) => void }
    >({
        mutationKey: createQueryKey("sendFileThroughMessage", {}),
        mutationFn: ({ file, attachInfo, onProgress }) =>
            ServiceMessages.sendFileThroughMessage(file, attachInfo, onProgress),
    });
}
