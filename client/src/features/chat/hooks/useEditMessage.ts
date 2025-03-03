import { editedMessage } from "@/entities/message/libs/messageService";
import { useMutation } from "@tanstack/react-query";
import { TypeChatFormSchema } from "../schemes/chatFormShcema";

export const useEditMessage = () => {
  const { mutate, isPending } = useMutation({
    mutationKey: ["edit message"],
    mutationFn: ({
      content,
      queryUrl,
      query,
      messageId,
    }: TypeChatFormSchema & {
      queryUrl: string;
      query: Record<string, string>;
      messageId: string;
    }) => editedMessage({ content, messageId, query, queryUrl }),
  });

  return {
    isPending,
    mutate,
  };
};
