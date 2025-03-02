import { useEffect } from "react";
import { useAppSelector } from "./useAppSelector";
import { socketSelectors } from "@/entities/socket/model/store/socketSlice";

export const useSocketEvents = <T>(
  event: string,
  callback: (data: T) => void
) => {
  const socket = useAppSelector(socketSelectors.socket);

  useEffect(() => {
    if (!socket) {
      console.log("Socket is not initialized for event:", event);
      return;
    }

    if (!socket.connected) {
      console.log("Socket not connected for event:", event, socket.connected);
      socket.connect();
    }

    const handler = (data: T) => {
      console.log(`Event ${event} received:`, data);
      callback(data);
    };

    socket.on(event, handler);
    socket.on("connect_error", (err) => {
      console.error("Socket connect error for event:", event, err.message);
    });

    return () => {
      socket.off(event, handler);
      socket.off("connect_error");
    };
  }, [socket, event, callback]);
};
