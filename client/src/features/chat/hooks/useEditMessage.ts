import { useMutation } from "@tanstack/react-query";
import { TypeChatFormSchema } from "../schemes/chatFormShcema";
import { getSessionUser } from "@/entities/session/libs/sessionService";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { socketSelectors } from "@/entities/socket/model/store/socketSlice";

export const useEditMessage = () => {
  const socket = useAppSelector(socketSelectors.socket);

  const { mutate, isPending } = useMutation({
    mutationKey: ["edit message"],
    mutationFn: async ({
      content,
      query: { channelId, serverId },
      messageId,
    }: TypeChatFormSchema & {
      query: Record<string, string>;
      messageId: string;
    }) => {
      const sessionId = await getSessionUser();
      socket?.emit("updateMessage", {
        messageId,
        content,
        sessionId,
        channelId,
        serverId,
      });
      return new Promise((resolve) => resolve("hello"));
    },
  });

  return {
    isPending,
    mutate,
  };
};
