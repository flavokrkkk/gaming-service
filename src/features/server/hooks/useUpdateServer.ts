"use client";

import { IServerRequest } from "@/entities";
import { updateServerSettings } from "@/entities/server/libs/serverService";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useUpdateServer = ({ serverId }: { serverId: string }) => {
  const router = useRouter();

  const { mutate } = useMutation({
    mutationKey: ["server"],
    mutationFn: (requestBody: IServerRequest) =>
      updateServerSettings({ serverId, ...requestBody }),
    onSuccess: (data) => {
      toast.success(`Server ${data.name} update successfully!`);
      router.refresh();
    },
    onError: () => {
      toast.error(`Failed to create server.`);
    },
  });

  return {
    mutate,
  };
};
