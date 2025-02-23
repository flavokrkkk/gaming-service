"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/shared";
import ServerCustomizeForm from "./serverCustomizeForm";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { serverSelectors } from "@/entities/server/models/store/serverSlice";
import { useActions } from "@/shared/hooks/useActions";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomizeFormSchema, TypeCustomizeFormSchema } from "../schemes";

const ServerCustomizeModal = () => {
  const isOpen = useAppSelector(serverSelectors.isOpen) ?? false;
  const type = useAppSelector(serverSelectors.type) ?? null;
  const { setClose } = useActions();

  const form = useForm<TypeCustomizeFormSchema>({
    resolver: zodResolver(CustomizeFormSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  const { isModalOpen, onClose } = useMemo(() => {
    return {
      isModalOpen: isOpen && type === "createServer",
      onClose: () => {
        form.reset();
        setClose();
      },
    };
  }, [form, setClose, isOpen, type]);
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Customize your server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Give your server a personality with a name an image. You can always
            change it later
          </DialogDescription>
        </DialogHeader>
        <ServerCustomizeForm form={form} />
      </DialogContent>
    </Dialog>
  );
};

export default ServerCustomizeModal;
