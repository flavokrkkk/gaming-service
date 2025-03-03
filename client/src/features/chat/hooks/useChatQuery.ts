import { getChatMessages } from "@/entities/message/libs/messageService";
import { IChatQuery, MessagePage } from "@/entities/message/types/types";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useChatQuery = ({
  queryKey,
  apiUrl,
  paramKey,
  paramValue,
  channelId,
}: IChatQuery) => {
  const { data, fetchNextPage, hasNextPage, isFetchNextPageError, status } =
    useInfiniteQuery<MessagePage, Error>({
      queryKey: [queryKey],
      queryFn: ({ pageParam }) =>
        getChatMessages({
          pageParam: pageParam as string,
          paramKey,
          apiUrl,
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
