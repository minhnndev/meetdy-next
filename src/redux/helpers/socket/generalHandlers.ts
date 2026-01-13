import { SocketEvent } from "@/redux/types/socketEvents";
import { connectionEstablished, connectionLost, socketError } from "@/redux/slice/socketSlice";
import { Socket } from "socket.io-client";
import { StoreApi } from "@/redux/types";

export const generalHandlers = (socket: Socket, storeApi: StoreApi): void => {
    const { dispatch } = storeApi;

    socket.on(SocketEvent.Connect, () => {
        dispatch(connectionEstablished());
    });

    socket.on(SocketEvent.Disconnect, () => {
        dispatch(connectionLost());
    });

    socket.on(SocketEvent.Error, (error: string) => {
        dispatch(socketError(error));
    });

    socket.on(SocketEvent.RevokeToken, (key: string) => {
        const currentTokenKey = localStorage.getItem("token");
        if (currentTokenKey !== key) {
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            window.location.reload();
        }
    });
};
