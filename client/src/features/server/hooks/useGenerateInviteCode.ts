"use client";

import { IServer, updateInviteLink } from "@/entities";
import { useActions } from "@/shared/hooks/useActions";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGenerateInviteCode = ({ serverId }: { serverId: string }) => {
  const { setIsOpen } = useActions();

  const { isPending, mutate } = useMutation({
    mutationKey: ["invite", serverId],
    mutationFn: () => updateInviteLink({ serverId }),
    onSuccess: (data: IServer) => {
      setIsOpen({ type: "invite", data: { server: data } });
    },
    onError: () => {
      toast.error(`Failed to update invite link.`);
    },
  });

  return {
    mutate,
    isPending,
  };
};
