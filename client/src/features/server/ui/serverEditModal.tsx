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
import { CustomizeFormSchema, TypeCustomizeFormSchema } from "../schemes";
import ServerCustomizeForm from "./serverCustomizeForm";
import { useUpdateServer } from "../hooks/useUpdateServer";

const ServerEditModal = () => {
  const isOpen = useAppSelector(serverSelectors.isOpen);
  const type = useAppSelector(serverSelectors.type);
  const selectServer = useAppSelector(serverSelectors.selectServers);

  const { mutate } = useUpdateServer({
    serverId: selectServer?.server?.id ?? "",
  });

  const { setClose } = useActions();

  const form = useForm<TypeCustomizeFormSchema>({
    resolver: zodResolver(CustomizeFormSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  const { isModalOpen, onClose } = useMemo(() => {
    const shouldReset = isOpen && type === "editServer" && selectServer;

    if (shouldReset) {
      form.reset({
        name: selectServer.server?.name,
        imageUrl: selectServer.server?.imageUrl,
      });
    }

    return {
      isModalOpen: isOpen && type === "editServer",
      onClose: () => {
        form.reset();
        setClose();
      },
    };
  }, [form, isOpen, type, selectServer]);

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 text-white border border-zinc-800 rounded-lg shadow-2xl mx-auto overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Customize your server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Give your server a personality with a name an image. You can always
            change it later
          </DialogDescription>
        </DialogHeader>
        {isModalOpen && (
          <ServerCustomizeForm
            form={form}
            type="update"
            onMutate={mutate}
            onEvent={onClose}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ServerEditModal;
