import { sendMessage } from "@/entities/message/libs/messageService";
import { ISendMessageRequest } from "@/entities/message/types/types";
import { useActions } from "@/shared/hooks/useActions";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useChatMessage = () => {
  const router = useRouter();
  const { setClose } = useActions();

  const { mutate, isPending } = useMutation({
    mutationKey: ["chat message"],
    mutationFn: (request: ISendMessageRequest) => sendMessage({ ...request }),
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
