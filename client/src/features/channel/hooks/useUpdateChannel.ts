"use client";

import { updateChannel } from "@/entities/channel/libs/channelService";
import { IChannelRequest } from "@/entities/channel/types/types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useUpdateChannel = () => {
  const router = useRouter();

  const { mutate } = useMutation({
    mutationKey: ["channel"],
    mutationFn: (requestBody: IChannelRequest & { channelId: string }) =>
      updateChannel(requestBody),
    onSuccess: () => {
      toast.success(`Channel update successfully!`);
      router.refresh();
    },
    onError: () => {
      toast.error(`Failed to update channel.`);
    },
  });

  return {
    mutate,
  };
};
