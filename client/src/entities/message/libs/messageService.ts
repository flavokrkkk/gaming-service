import qs from "query-string";
import { IChatQuery, MessagePage } from "../types/types";
import { getSessionUser } from "@/entities/session/libs/sessionService";
import { axiosInstance } from "@/shared/api/baseQuery";

class MessageService {
  private static instance: MessageService;

  public static getInstance(): MessageService {
    if (!MessageService.instance) {
      MessageService.instance = new MessageService();
    }

    return MessageService.instance;
  }

  public async getChatMessages({
    apiUrl,
    pageParam,
    paramValue,
    paramKey,
    channelId,
  }: Partial<IChatQuery> & {
    pageParam?: string;
    apiUrl: string;
    paramKey: "channelId" | "conversationId";
    channelId: string;
  }): Promise<MessagePage> {
    const profileId = await getSessionUser();

    const url = qs.stringifyUrl(
      {
        url: apiUrl,
        query: {
          cursor: pageParam,
          [paramKey]: paramValue,
          channelId: channelId,
          profileId: profileId,
        },
      },
      {
        skipNull: true,
      }
    );

    const { data } = await axiosInstance.get<MessagePage>(url);
    return data;
  }
}

export const { getChatMessages } = MessageService.getInstance();
