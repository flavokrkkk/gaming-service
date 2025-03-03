import { ChannelType } from "@prisma/client";
import { IServer } from "../../types";
import { IChannel } from "@/entities/channel/types/types";

export type ModalType =
  | "createServer"
  | "invite"
  | "editServer"
  | "members"
  | "createChannel"
  | "leaveServer"
  | "deleteServer"
  | "deleteChannel"
  | "editChannel"
  | "messageFile"
  | "deleteMessage";

export interface IModalData {
  server?: IServer;
  channel?: IChannel;
  channelType?: ChannelType;
  apiUrl?: string;
  query?: Record<string, unknown>;
}

export interface IServerSliceState {
  type: ModalType | null;
  isOpen: boolean;
  selectChannelType: ChannelType;
  selectServers: IModalData | null;
}
