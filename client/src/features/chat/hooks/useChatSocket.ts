"use client";

import { IMessage } from "@/entities/message/types/types";
import { queryClient } from "@/shared/api/queryClient";
import { useSocketEvents } from "@/shared/hooks/useSocketEvents";
import { ESocketEvents } from "@/shared/libs/utils/socketEvents";

type ChatSocket = {
  chatId: string;
};

export const useChatSocket = ({ chatId }: ChatSocket) => {
  const handleChangeMessage = (message: IMessage) => {
    queryClient.setQueryData(
      [`chat:${chatId}`],
      (oldData: { pages: Array<{ items: Array<IMessage> }> }) => {
        if (!oldData || !oldData.pages || oldData.pages.length === 0) {
          return oldData;
        }

        const newData = oldData.pages.map((page) => ({
          ...page,
          items: page.items.map((item) =>
            item.id === message.id ? message : item
          ),
        }));
        return { ...oldData, pages: newData };
      }
    );
  };

  const handleSetMessages = (message: IMessage) => {
    queryClient.setQueryData(
      [`chat:${chatId}`],
      (oldData: { pages: Array<{ items: Array<IMessage> }> }) => {
        if (!oldData || !oldData.pages || oldData.pages.length === 0) {
          return { pages: [{ items: [message], nextCursor: null }] };
        }
        const newData = [...oldData.pages];
        newData[0] = {
          ...newData[0],
          items: [message, ...newData[0].items],
        };
        return {
          ...oldData,
          pages: newData,
        };
      }
    );
  };

  useSocketEvents<IMessage>(ESocketEvents.UPDATE_MESSAGE, (message) => {
    handleChangeMessage(message);
  });

  useSocketEvents<IMessage>(ESocketEvents.DELETE_MESSAGE, (message) => {
    handleChangeMessage(message);
  });

  useSocketEvents<IMessage>(ESocketEvents.NEW_MESSAGE, (message) => {
    handleSetMessages(message);
  });
};
