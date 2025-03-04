import { ISendMessageRequest } from "@/entities/message/types/types";
import { socketSelectors } from "@/entities/socket/model/store/socketSlice";
import { useActions } from "@/shared/hooks/useActions";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { useMutation } from "@tanstack/react-query";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const useChatMessage = () => {
  const router = useRouter();
  const { setClose } = useActions();
  const socket = useAppSelector(socketSelectors.socket);

  const { mutate, isPending } = useMutation({
    mutationKey: ["chat message"],
    // mutationFn: (request: ISendMessageRequest) => sendMessage({ ...request }),
    mutationFn: async (request: ISendMessageRequest) => {
      const session = await getSession();
      console.log(session);
      if (!session || !session.user?.id) return null;
      const sessionId = session.user.id;
      socket?.emit("newMessage", {
        ...request,
        query: { ...request.query, sessionId },
      });
      return new Promise((resolve) => resolve("hello"));
    },

    onSuccess: () => {
      setClose();
      router.refresh();
    },
  });

  return {
    isPending,
    mutate,
  };
};
