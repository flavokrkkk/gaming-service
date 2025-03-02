import { IMember } from "@/entities/member/types/types";
import { ICurrentUser } from "@/entities/user";
import { TypeChatFormSchema } from "@/features/chat/schemes/chatFormShcema";
import { TypeFileFormSchema } from "@/features/chat/schemes/fileFormSchema";

export interface ISendMessageRequest {
  apiUrl: string;
  query: Record<string, unknown>;
  requestBody: TypeChatFormSchema & Partial<TypeFileFormSchema>;
}

export interface IChatQuery {
  queryKey: string;
  apiUrl: string;
  channelId: string;
  paramKey: "channelId" | "conversationId";
  paramValue: string;
}

export interface IMessage {
  id: string;
  content: string;

  fileUrl: {
    type: string;
    url: string;
  };

  memberId: string;
  member: IMember;

  channelId: string;
  profile: ICurrentUser;

  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface MessagePage {
  items: IMessage[];
  nextCursor: string | null;
}
