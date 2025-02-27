"use client";

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/shared";

import { serverSelectors } from "@/entities/server/models/store/serverSlice";
import { useActions } from "@/shared/hooks/useActions";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { AlertTriangle } from "lucide-react";
import { Separator } from "@/shared/ui/separator";
import { useLeaveServer } from "../hooks/useLeaveServer";

const ServerLeaveModal = () => {
  const isOpen = useAppSelector(serverSelectors.isOpen);
  const type = useAppSelector(serverSelectors.type);
  const selectServers = useAppSelector(serverSelectors.selectServers);

  const { mutate, isPending } = useLeaveServer();

  const { setClose } = useActions();

  const isModalOpen = isOpen && type === "leaveServer";

  const handleClose = () => setClose();

  const handleLeaveServer = () =>
    mutate({ serverId: selectServers?.server.id });

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-zinc-900 text-white border border-zinc-800 rounded-xl shadow-2xl mx-auto p-0 overflow-hidden">
        <div className="flex items-center justify-center pt-8 pb-4">
          <AlertTriangle className="h-8 w-8 text-red-500 mr-3" />
          <DialogTitle className="text-2xl font-bold text-center">
            Leave Server
          </DialogTitle>
        </div>
        <DialogDescription className="px-6 text-center text-zinc-400 text-base leading-relaxed">
          Are you sure you want to leave
          <span className="font-semibold text-indigo-400 ml-1">
            {selectServers?.server.name}
          </span>
          ?
        </DialogDescription>

        <Separator className="my-4 border-t border-zinc-800" />

        <DialogFooter className="px-6 pb-6">
          <div className="flex items-center justify-between w-full gap-4">
            <Button variant="ghost" onClick={handleClose} className="w-full">
              Cancel
            </Button>
            <Button
              disabled={isPending}
              variant="indigo"
              className="w-full"
              onClick={handleLeaveServer}
            >
              Leave
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ServerLeaveModal;
