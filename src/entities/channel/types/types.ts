import { IServer } from "@/entities/server";
import { ChannelType } from "@prisma/client";

export interface IChannel {
  id: string;
  name: string;
  type: ChannelType;

  profileId: string;

  serverId: IServer["id"];

  createdAt: Date;
  updatedAt: Date;
}

export interface IChannelRequest {
  name: string;
  type: ChannelType;
  serverId: string;
  isPrivate: boolean;
}
