import { getChatMessages } from "@/entities/message/libs/messageService";
import { IChatQuery, MessagePage } from "@/entities/message/types/types";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useChatQuery = ({
  paramKey,
  paramValue,
  channelId,
}: IChatQuery) => {
  const { data, fetchNextPage, hasNextPage, isFetchNextPageError, status } =
    useInfiniteQuery<MessagePage, Error>({
      queryKey: [`chat:${channelId}`],
      queryFn: ({ pageParam }) =>
        getChatMessages({
          pageParam: pageParam as string,
          paramKey,
          paramValue,
          channelId,
        }),

      getNextPageParam: (lastPage) => lastPage?.nextCursor || undefined,
      initialPageParam: undefined,
      refetchInterval: false,
    });

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchNextPageError,
    status,
  };
};
