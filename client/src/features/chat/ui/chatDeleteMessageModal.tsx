"use client";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogFooter,
  DialogContent,
  DialogDescription,
} from "@/shared";

import { serverSelectors } from "@/entities/server/models/store/serverSlice";
import { useActions } from "@/shared/hooks/useActions";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { AlertTriangle } from "lucide-react";
import { Separator } from "@/shared/ui/separator";
import { useDeleteMessage } from "../hooks/useDeleteMessage";

const ChatDeleteMessageModal = () => {
  const isOpen = useAppSelector(serverSelectors.isOpen);
  const type = useAppSelector(serverSelectors.type);
  const selectData = useAppSelector(serverSelectors.selectServers);

  const { mutate, isPending } = useDeleteMessage();

  const { setClose } = useActions();

  const isModalOpen = isOpen && type === "deleteMessage";

  const handleClose = () => setClose();

  const handleDeleteServer = () => {
    if (selectData?.apiUrl && selectData.query) {
      mutate({
        query: selectData?.query as Record<string, string>,
      });
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-zinc-900 text-white border border-zinc-800 rounded-xl shadow-2xl mx-auto p-0 overflow-hidden">
        <div className="flex items-center justify-center pt-8">
          <AlertTriangle className="h-8 w-8 text-red-500 mr-3" />
          <DialogTitle className="text-2xl font-bold text-center">
            Delete Message
          </DialogTitle>
        </div>
        <DialogDescription className="px-6 text-center text-zinc-400 text-base leading-relaxed">
          Are you sure you want to do this ? <br />
          The message will be permanently deleted.
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
              onClick={handleDeleteServer}
            >
              Delete
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChatDeleteMessageModal;
