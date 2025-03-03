"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { serverSelectors } from "@/entities/server/models/store/serverSlice";
import { useActions } from "@/shared/hooks/useActions";
import { useCallback, useMemo } from "react";
import {
  CreateChannelFormSchema,
  TypeCreateChannelFormSchema,
} from "../schemes/createChannelSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ChannelCreateForm from "./channelCreateForm";
import { useCreateChannel } from "../hooks/useCreateChannel";
import { useParams } from "next/navigation";

const ChannelCreateModal = () => {
  const isOpen = useAppSelector(serverSelectors.isOpen);
  const type = useAppSelector(serverSelectors.type);
  const channelType = useAppSelector(serverSelectors.selectChannelType);

  const params = useParams();

  const { setClose } = useActions();

  const { mutate } = useCreateChannel();

  const form = useForm<TypeCreateChannelFormSchema>({
    resolver: zodResolver(CreateChannelFormSchema),
    defaultValues: {
      name: "",
      type: channelType,
      isPrivate: false,
    },
  });

  const isModalOpen = useMemo(() => {
    const shouldReset = isOpen && type === "createChannel";

    if (shouldReset) {
      form.reset({
        name: "",
        type: channelType,
        isPrivate: false,
      });
    }

    return shouldReset;
  }, [type, isOpen, channelType, form]);

  const onClose = useCallback(() => {
    form.reset();
    setClose();
  }, [form]);

  const handleMutateChannel = useCallback(
    (values: TypeCreateChannelFormSchema) => {
      if (params.serverId) {
        mutate({ serverId: params.serverId as string, ...values });
      }
    },
    [params, mutate]
  );

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 text-white border border-zinc-800 rounded-lg shadow-2xl mx-auto overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Create Channel
          </DialogTitle>
        </DialogHeader>
        {isModalOpen && (
          <ChannelCreateForm
            form={form}
            onEvent={onClose}
            onMutate={handleMutateChannel}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ChannelCreateModal;
