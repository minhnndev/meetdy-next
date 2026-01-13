import { io, Socket } from 'socket.io-client';

export let socket: Socket | null = null;

export const createSocketConnection = (): Socket => {
  if (!socket) {
    socket = io(import.meta.env.VITE_SOCKET_URL, {
      transports: ['websocket'],
      withCredentials: true,
    });
  }
  return socket;
};

export const destroySocketConnection = (): void => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const isSocketConnected = (): boolean => {
  return !!socket?.connected;
};
