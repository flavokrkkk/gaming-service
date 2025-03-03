"use client";

import { IServerRequest } from "@/entities";
import { createServer } from "@/entities/server/libs/serverService";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useCreateServer = () => {
  const router = useRouter();

  const { mutate } = useMutation({
    mutationKey: ["server"],
    mutationFn: (requestBody: IServerRequest) => createServer(requestBody),
    onSuccess: (data) => {
      toast.success(`Server ${data.name} created successfully!`);
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
