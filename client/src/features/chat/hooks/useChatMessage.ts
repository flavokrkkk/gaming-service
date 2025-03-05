import { ISendMessageRequest } from "@/entities/message/types/types";
import { getSessionUser } from "@/entities/session/libs/sessionService";
import { socketSelectors } from "@/entities/socket/model/store/socketSlice";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { ESocketEvents } from "@/shared/libs/utils/socketEvents";
import { useTransition } from "react";

export const useChatMessage = () => {
  const socket = useAppSelector(socketSelectors.socket);
  const [isPending, startTransition] = useTransition();

  const handleSendMessage = async (request: ISendMessageRequest) => {
    const sessionId = await getSessionUser();
    startTransition(() => {
      socket?.emit(ESocketEvents.NEW_MESSAGE, {
        ...request,
        query: { ...request.query, sessionId },
      });
    });
  };

  return {
    isPending,
    handleSendMessage,
  };
};
