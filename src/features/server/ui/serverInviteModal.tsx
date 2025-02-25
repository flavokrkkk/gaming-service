"use client";

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
} from "@/shared";

import { serverSelectors } from "@/entities/server/models/store/serverSlice";
import { useActions } from "@/shared/hooks/useActions";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { Check, Copy, RefreshCw } from "lucide-react";
import { useOrigin } from "@/shared/hooks/useOrigin";
import { useMemo } from "react";
import { useCopied } from "@/shared/hooks/useCopied";
import { useGenerateInviteCode } from "../hooks/useGenerateInviteCode";

const ServerInviteModal = () => {
  const isOpen = useAppSelector(serverSelectors.isOpen);
  const type = useAppSelector(serverSelectors.type);
  const selectServers = useAppSelector(serverSelectors.selectServers);

  const { isPending, mutate } = useGenerateInviteCode({
    serverId: selectServers?.server.id ?? "",
  });

  const { setClose } = useActions();
  const { origin } = useOrigin();
  const { handleCopyClick, isCopied, isPending: isLoading } = useCopied();

  const inviteUrl = useMemo(
    () => `${origin}/invite/${selectServers?.server.inviteCode}`,
    [selectServers?.server, origin]
  );

  const isModalOpen = isOpen && type === "invite";

  const handleUpdateInviteCode = () => mutate();

  const handleClose = () => setClose();

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Invite Friends
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
            Server Invite link
          </Label>
          <div className="flex items-center mt-2 gap-x-2">
            <Input
              disabled={isPending || isLoading}
              value={inviteUrl}
              onChange={() => {}}
              className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
            />
            <Button
              disabled={isPending || isLoading}
              value={inviteUrl}
              size={"icon"}
              onClick={handleCopyClick}
            >
              {isCopied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
          <Button
            disabled={isPending || isLoading}
            variant={"link"}
            size={"sm"}
            className="text-xs text-zinc-500 mt-4"
            onClick={handleUpdateInviteCode}
          >
            Generate a new link
            <RefreshCw className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServerInviteModal;
