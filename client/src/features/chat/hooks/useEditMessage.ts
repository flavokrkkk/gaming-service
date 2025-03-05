import { TypeChatFormSchema } from "../schemes/chatFormShcema";
import { getSessionUser } from "@/entities/session/libs/sessionService";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { socketSelectors } from "@/entities/socket/model/store/socketSlice";
import { useTransition } from "react";
import { ESocketEvents } from "@/shared/libs/utils/socketEvents";

export const useEditMessage = () => {
  const socket = useAppSelector(socketSelectors.socket);
  const [isPending, startTransition] = useTransition();

  const handleChangeMessage = async ({
    content,
    query: { channelId, serverId },
    messageId,
  }: TypeChatFormSchema & {
    query: Record<string, string>;
    messageId: string;
  }) => {
    const sessionId = await getSessionUser();

    startTransition(() => {
      socket?.emit(ESocketEvents.UPDATE_MESSAGE, {
        messageId,
        content,
        sessionId,
        channelId,
        serverId,
      });
    });
  };

  return {
    isPending,
    handleChangeMessage,
  };
};
