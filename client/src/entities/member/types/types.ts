import { IServer } from "@/entities/server";
import { ICurrentUser } from "@/entities/user";
import { MemberRole } from "@prisma/client";

export interface IMember {
  id: string;
  role: MemberRole;

  profileId: ICurrentUser["id"];
  profile: ICurrentUser;

  serverId: IServer["id"];

  createdAt: Date;
  updatedAt: Date;
}

export interface IChangeMemberRequest {
  memberId: string;
  serverId: string;
  role: MemberRole;
}
