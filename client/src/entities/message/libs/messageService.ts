import axios from "axios";
import qs from "query-string";
import { IChatQuery, ISendMessageRequest, MessagePage } from "../types/types";
import { TypeChatFormSchema } from "@/features/chat/schemes/chatFormShcema";

class MessageService {
  private static instance: MessageService;

  public static getInstance(): MessageService {
    if (!MessageService.instance) {
      MessageService.instance = new MessageService();
    }

    return MessageService.instance;
  }

  public async sendMessage({
    apiUrl,
    query,
    requestBody,
  }: ISendMessageRequest) {
    const url = qs.stringifyUrl({
      url: apiUrl,
      query: { ...query } as qs.StringifiableRecord,
    });

    const { data } = await axios.post(url, { requestBody });

    return data;
  }

  public async getChatMessages({
    apiUrl,
    pageParam,
    paramValue,
    paramKey,
    channelId,
  }: Partial<IChatQuery> & {
    pageParam?: string;
    paramKey: "channelId" | "conversationId";
    channelId: string;
  }): Promise<MessagePage> {
    const url = qs.stringifyUrl(
      {
        url: apiUrl ?? "",
        query: {
          cursor: pageParam,
          [paramKey]: paramValue,
          channelId: channelId,
        },
      },
      {
        skipNull: true,
      }
    );

    const { data } = await axios.get<MessagePage>(url);
    return data;
  }

  public async editedMessage({
    content,
    queryUrl,
    query,
    messageId,
  }: TypeChatFormSchema & {
    queryUrl: string;
    query: Record<string, string>;
    messageId: string;
  }) {
    const url = qs.stringifyUrl({
      url: `${queryUrl}/${messageId}`,
      query: { ...query },
    });

    const { data } = await axios.patch(url, { content });

    return data;
  }

  public async deletedMessage({
    apiUrl,
    query,
  }: {
    apiUrl: string;
    query: Record<string, string>;
  }) {
    const url = qs.stringifyUrl({
      url: apiUrl,
      query: { ...query },
    });

    const { data } = await axios.delete(url);

    return data;
  }
}

export const { sendMessage, getChatMessages, editedMessage, deletedMessage } =
  MessageService.getInstance();
