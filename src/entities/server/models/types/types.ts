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
  | "editChannel";

export interface IModalData {
  server?: IServer;
  channel?: IChannel;
  channelType?: ChannelType;
}

export interface IServerSliceState {
  type: ModalType | null;
  isOpen: boolean;
  selectChannelType: ChannelType;
  selectServers: IModalData | null;
}
