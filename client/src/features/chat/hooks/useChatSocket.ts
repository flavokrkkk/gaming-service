"use client";

import { IMessage } from "@/entities/message/types/types";
import { queryClient } from "@/shared/api/queryClient";
import { useSocketEvents } from "@/shared/hooks/useSocketEvents";

type ChatSocket = {
  addKey: string;
  updateKey: string;
  queryKey: string;
};

export const useChatSocket = ({ addKey, updateKey, queryKey }: ChatSocket) => {
  useSocketEvents<IMessage>(updateKey, (message) => {
    queryClient.setQueryData(
      [queryKey],
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
  });

  useSocketEvents<IMessage>(addKey, (message) => {
    queryClient.setQueryData(
      [queryKey],
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
  });
};
