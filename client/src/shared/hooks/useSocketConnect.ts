import { useEffect } from "react";
import { useActions } from "../hooks/useActions";
import { useAppSelector } from "../hooks/useAppSelector";
import { socketSelectors } from "@/entities/socket/model/store/socketSlice";

export const useSocketConnect = () => {
  const { connectionSocket } = useActions();
  const isConnected = useAppSelector(socketSelectors.isConnected);
  const socket = useAppSelector(socketSelectors.socket);

  useEffect(() => {
    if (!isConnected) {
      connectionSocket();
    }

    if (socket) {
      socket.on("disconnect", () => {
        connectionSocket();
      });
    }

    return () => {
      if (socket) {
        socket.off("disconnect");
      }
    };
  }, [isConnected, socket, connectionSocket]);
};
