import { getSessionUser } from "@/entities/session/libs/sessionService";
import { socketSelectors } from "@/entities/socket/model/store/socketSlice";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { ESocketEvents } from "@/shared/libs/utils/socketEvents";
import { useTransition } from "react";

export const useDeleteMessage = () => {
  const [isPending, startTransition] = useTransition();
  const socket = useAppSelector(socketSelectors.socket);

  const handleDeleteMessage = async ({
    query: { channelId, serverId, messageId },
  }: {
    query: Record<string, string>;
  }) => {
    const sessionId = await getSessionUser();
    startTransition(() => {
      socket?.emit(ESocketEvents.DELETE_MESSAGE, {
        messageId,
        sessionId,
        channelId,
        serverId,
      });
    });
  };

  return {
    isPending,
    handleDeleteMessage,
  };
};
