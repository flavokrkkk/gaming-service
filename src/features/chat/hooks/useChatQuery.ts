import { getChatMessages } from "@/entities/message/libs/messageService";
import { IChatQuery, MessagePage } from "@/entities/message/types/types";
import { socketSelectors } from "@/entities/socket/model/store/socketSlice";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useChatQuery = ({
  queryKey,
  apiUrl,
  paramKey,
  paramValue,
  channelId,
}: IChatQuery) => {
  const isConnected = useAppSelector(socketSelectors.isConnected);

  const { data, fetchNextPage, hasNextPage, isFetchNextPageError, status } =
    useInfiniteQuery<MessagePage, Error>({
      queryKey: [queryKey, channelId],
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
      refetchInterval: isConnected ? false : 1000,
    });

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchNextPageError,
    status,
  };
};
