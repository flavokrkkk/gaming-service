"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/shared";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { serverSelectors } from "@/entities/server/models/store/serverSlice";
import { useActions } from "@/shared/hooks/useActions";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileFormSchema, TypeFileFormSchema } from "../schemes/fileFormSchema";
import ChatMessageFileForm from "./chatMessageFileForm";
import { useChatMessage } from "../hooks/useChatMessage";

const ChatMessageFileModal = () => {
  const isOpen = useAppSelector(serverSelectors.isOpen);
  const type = useAppSelector(serverSelectors.type);
  const selectServers = useAppSelector(serverSelectors.selectServers);

  const { setClose } = useActions();

  const { mutate } = useChatMessage();

  const form = useForm<TypeFileFormSchema>({
    resolver: zodResolver(FileFormSchema),
    defaultValues: {
      fileUrl: "",
    },
  });

  const { isModalOpen, onClose } = useMemo(() => {
    return {
      isModalOpen: isOpen && type === "messageFile",
      onClose: () => {
        form.reset();
        setClose();
      },
    };
  }, [form, setClose, isOpen, type]);

  const handleMutation = (values: TypeFileFormSchema) => {
    if (selectServers?.apiUrl && selectServers.query) {
      mutate({
        apiUrl: selectServers?.apiUrl,
        query: selectServers?.query,
        requestBody: { ...values, content: values.fileUrl },
      });
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 text-white border border-zinc-800 rounded-lg shadow-2xl mx-auto overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Add an attachment
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Send a file as a message
          </DialogDescription>
        </DialogHeader>
        {isModalOpen && (
          <ChatMessageFileForm
            form={form}
            onMutate={handleMutation}
            onEvent={onClose}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ChatMessageFileModal;
