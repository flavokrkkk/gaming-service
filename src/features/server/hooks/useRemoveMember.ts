"use client";

import { IServer } from "@/entities";
import { deleteMember } from "@/entities/member/libs/memberService";
import { IChangeMemberRequest } from "@/entities/member/types/types";
import { useActions } from "@/shared/hooks/useActions";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

export const useRemoveMember = (
  setLoadingId: Dispatch<SetStateAction<string>>
) => {
  const router = useRouter();
  const { setIsOpen } = useActions();

  const { mutate, isPending } = useMutation({
    mutationKey: ["member delete"],
    mutationFn: (requestBody: Partial<IChangeMemberRequest>) => {
      setLoadingId(requestBody.memberId ?? "");
      return deleteMember(requestBody);
    },
    onSuccess: (server: IServer) => {
      router.refresh();
      setIsOpen({ type: "members", data: { server } });
      setLoadingId("");
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
