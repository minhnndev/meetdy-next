import { channelHandlers } from "@/redux/helpers/socket/channelHandlers";
import { conversationHandlers } from "@/redux/helpers/socket/conversationHandlers";
import { friendHandlers } from "@/redux/helpers/socket/friendHandlers";
import { generalHandlers } from "@/redux/helpers/socket/generalHandlers";
import { messageHandlers } from "@/redux/helpers/socket/messageHandlers";
import { StoreApi } from "@/redux/types";
import { Socket } from "socket.io-client";

export const registerSocketHandlers = (socket: Socket, storeApi: StoreApi): void => {
    const { isJoinChatLayout } = storeApi.getState().global;

    generalHandlers(socket, storeApi);
    friendHandlers(socket, storeApi);
    conversationHandlers(socket, storeApi, isJoinChatLayout);
    messageHandlers(socket, storeApi, isJoinChatLayout);
    channelHandlers(socket, storeApi, isJoinChatLayout);
};
