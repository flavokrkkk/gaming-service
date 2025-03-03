"use client";

import { serverLeave } from "@/entities";
import { IChangeMemberRequest } from "@/entities/member/types/types";
import { useActions } from "@/shared/hooks/useActions";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useLeaveServer = () => {
  const router = useRouter();
  const { setClose } = useActions();

  const { mutate, isPending } = useMutation({
    mutationKey: ["leave server"],
    mutationFn: ({
      serverId,
    }: Partial<IChangeMemberRequest & { serverId: string }>) => {
      if (!serverId) throw new Error("Server id is missing!");
      return serverLeave({ serverId: serverId });
    },
    onSuccess: () => {
      setClose();
      router.push("/");
      router.refresh();
    },
    onError: () => {
      toast.error(`Failed to update server.`);
    },
  });

  return {
    isPending,
    mutate,
  };
};
