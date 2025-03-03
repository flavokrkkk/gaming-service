"use client";

import { createChannel } from "@/entities/channel/libs/channelService";
import { IChannelRequest } from "@/entities/channel/types/types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useCreateChannel = () => {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationKey: ["channel"],
    mutationFn: (requestBody: IChannelRequest) => createChannel(requestBody),
    onSuccess: () => {
      toast.success(`Channel created successfully!`);
      router.refresh();
    },
    onError: () => {
      toast.error(`Failed to create channel.`);
    },
  });

  return {
    isPending,
    mutate,
  };
};
