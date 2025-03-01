"use client";

import { IServer } from "@/entities";
import { deleteChannel } from "@/entities/channel/libs/channelService";
import { IChannel } from "@/entities/channel/types/types";
import { useActions } from "@/shared/hooks/useActions";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useDeleteChannel = () => {
  const router = useRouter();
  const { setClose } = useActions();

  const { mutate, isPending } = useMutation({
    mutationKey: ["delete channel"],
    mutationFn: ({
      id,
      serverId,
    }: Partial<IChannel> & { id: string; serverId: string }) => {
      if (!id) throw new Error("Channel id is missing!");
      return deleteChannel({ serverId: serverId, id });
    },
    onSuccess: (data: IServer) => {
      setClose();
      router.push(`/servers/${data.id}`);
      router.refresh();
      toast.success(`Channel deleted successfully!`);
    },
    onError: () => {
      toast.error(`Failed to delete channel.`);
    },
  });

  return {
    isPending,
    mutate,
  };
};
