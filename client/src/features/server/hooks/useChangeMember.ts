"use client";

import { IServer } from "@/entities";
import { changeMemberRole } from "@/entities/member/libs/memberService";
import { IChangeMemberRequest } from "@/entities/member/types/types";
import { useActions } from "@/shared/hooks/useActions";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

export const useChangeMember = (
  setLoadingId: Dispatch<SetStateAction<string>>
) => {
  const router = useRouter();
  const { setIsOpen } = useActions();

  const { mutate, isPending } = useMutation({
    mutationKey: ["member"],
    mutationFn: (requestBody: IChangeMemberRequest) => {
      setLoadingId(requestBody.memberId);
      return changeMemberRole(requestBody);
    },
    onSuccess: (server: IServer) => {
      router.refresh();
      setIsOpen({ type: "members", data: { server } });
      setLoadingId("");
    },
    onError: () => {
      toast.error(`Failed to create server.`);
    },
  });

  return {
    isPending,
    mutate,
  };
};
