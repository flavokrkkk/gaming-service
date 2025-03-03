import { IChannel } from "@/entities/channel/types/types";
import { IMember } from "@/entities/member/types/types";

export interface IServer {
  id: string;
  name: string;
  imageUrl: string;
  inviteCode: string;

  profileId: string;
  members?: Array<IMember>;
  channels?: Array<IChannel>;

  createdAt: Date;
  updatedAt: Date;
}

export interface IServerRequest {
  name: string;
  imageUrl: string;
}
