"use client";

import { deleteServer, IServer } from "@/entities";
import { IChangeMemberRequest } from "@/entities/member/types/types";
import { useActions } from "@/shared/hooks/useActions";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useDeleteServer = () => {
  const router = useRouter();
  const { setClose } = useActions();

  const { mutate, isPending } = useMutation({
    mutationKey: ["delete server"],
    mutationFn: ({
      serverId,
    }: Partial<IChangeMemberRequest & { serverId: string }>) => {
      if (!serverId) throw new Error("Server id is missing!");
      return deleteServer({ serverId: serverId });
    },
    onSuccess: (data: IServer) => {
      setClose();
      router.push("/");
      router.refresh();
      toast.success(`Server ${data.name} deleted successfully!`);
    },
    onError: () => {
      toast.error(`Failed to delete server.`);
    },
  });

  return {
    isPending,
    mutate,
  };
};
