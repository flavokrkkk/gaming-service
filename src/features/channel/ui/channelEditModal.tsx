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
import { useUpdateChannel } from "../hooks/useUpdateChannel";

const ChannelEditModal = () => {
  const isOpen = useAppSelector(serverSelectors.isOpen);
  const type = useAppSelector(serverSelectors.type);
  const channelType = useAppSelector(serverSelectors.selectChannelType);
  const selectData = useAppSelector(serverSelectors.selectServers);

  const { setClose } = useActions();

  const { mutate } = useUpdateChannel();

  const form = useForm<TypeCreateChannelFormSchema>({
    resolver: zodResolver(CreateChannelFormSchema),
    defaultValues: {
      name: "",
      type: channelType,
      isPrivate: false,
    },
  });

  const isModalOpen = useMemo(() => {
    const shouldReset = isOpen && type === "editChannel";

    if (shouldReset) {
      form.reset({
        name: selectData?.channel?.name,
        type: selectData?.channel?.type,
        isPrivate: selectData?.channel?.isPrivate,
      });
    }

    return shouldReset;
  }, [type, isOpen, channelType, form, selectData]);

  const onClose = useCallback(() => {
    form.reset();
    setClose();
  }, [form]);

  const handleMutateChannel = useCallback(
    (values: TypeCreateChannelFormSchema) => {
      if (selectData?.channel?.id && selectData?.server?.id) {
        mutate({
          channelId: selectData?.channel?.id,
          serverId: selectData?.server?.id,
          ...values,
        });
      }
    },
    [mutate, selectData?.channel?.id, selectData?.server?.id]
  );

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 text-white border border-zinc-800 rounded-lg shadow-2xl mx-auto overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Edit Channel
          </DialogTitle>
        </DialogHeader>
        {isModalOpen && (
          <ChannelCreateForm
            type="edit"
            form={form}
            onEvent={onClose}
            onMutate={handleMutateChannel}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ChannelEditModal;
