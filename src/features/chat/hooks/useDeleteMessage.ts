import { deletedMessage } from "@/entities/message/libs/messageService";
import { useActions } from "@/shared/hooks/useActions";
import { useMutation } from "@tanstack/react-query";

export const useDeleteMessage = () => {
  const { setClose } = useActions();

  const { mutate, isPending } = useMutation({
    mutationKey: ["delete message"],
    mutationFn: ({
      apiUrl,
      query,
    }: {
      apiUrl: string;
      query: Record<string, string>;
    }) => deletedMessage({ query, apiUrl }),
    onSuccess: () => {
      setClose();
    },
  });

  return {
    isPending,
    mutate,
  };
};
