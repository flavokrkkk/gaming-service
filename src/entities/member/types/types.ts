import { IServer } from "@/entities/server";
import { ICurrentUser } from "@/entities/user";
import { MemberRole } from "@prisma/client";

export interface IMember {
  id: string;
  role: MemberRole;

  profileId: ICurrentUser["id"];

  serverId: IServer["id"];

  createdAt: Date;
  updatedAt: Date;
}
