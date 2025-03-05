import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ChatFormSchema, TypeChatFormSchema } from "../schemes/chatFormShcema";
import { useEditMessage } from "./useEditMessage";
import { useCallback, useEffect, useState } from "react";
import { useKeyPress } from "@/shared/hooks/useKeyPress";
import { EEventKeys } from "@/shared/libs/utils/eventKey";
import { useActions } from "@/shared/hooks/useActions";

export const useChangeMessage = ({
  content,
  messageId,
  socketQuery,
}: {
  content: string;
  messageId: string;
  socketQuery: Record<string, string>;
}) => {
  const { handleChangeMessage, isPending } = useEditMessage();
  const { setIsOpen } = useActions();

  const isKeyPress = useKeyPress([EEventKeys.ESCAPE]);
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<TypeChatFormSchema>({
    resolver: zodResolver(ChatFormSchema),
    defaultValues: {
      content,
    },
  });

  const isLoading = form.formState.isLoading;

  const onSubmit = (values: TypeChatFormSchema) => {
    handleChangeMessage({
      content: values.content,
      messageId,
      query: socketQuery,
    });
    form.reset();
    setIsEditing(false);
  };

  const handleOpenDeleteModal = () =>
    setIsOpen({
      type: "deleteMessage",
      data: {
        query: { ...socketQuery, messageId },
      },
    });

  const toggleEdit = useCallback(() => setIsEditing((p) => !p), []);

  useEffect(() => {
    if (isKeyPress) {
      setIsEditing(false);
    }
  }, [isKeyPress]);

  return {
    isPending: isPending || isLoading,
    isEditing,
    form,
    onSubmit,
    toggleEdit,
    handleOpenDeleteModal,
  };
};
