import { getSessionUser } from "@/entities/session/libs/sessionService";
import { socketSelectors } from "@/entities/socket/model/store/socketSlice";
import { useActions } from "@/shared/hooks/useActions";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { useMutation } from "@tanstack/react-query";

export const useDeleteMessage = () => {
  const { setClose } = useActions();
  const socket = useAppSelector(socketSelectors.socket);

  const { mutate, isPending } = useMutation({
    mutationKey: ["delete message"],
    mutationFn: async ({
      query: { channelId, serverId, messageId },
    }: {
      query: Record<string, string>;
    }) => {
      const sessionId = await getSessionUser();
      socket?.emit("deleteMessage", {
        messageId,
        sessionId,
        channelId,
        serverId,
      });
      return new Promise((resolve) => resolve("hello"));
    },
    onSuccess: () => {
      setClose();
    },
  });

  return {
    isPending,
    mutate,
  };
};
