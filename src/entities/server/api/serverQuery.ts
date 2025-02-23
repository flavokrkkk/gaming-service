import { db } from "@/shared/db";
import { IServer } from "../types/types";
import { ICurrentUser } from "@/entities/user/types/types";

class ServerQuery {
  private static instance: ServerQuery;

  public static getInstance(): ServerQuery {
    if (!ServerQuery.instance) {
      ServerQuery.instance = new ServerQuery();
    }

    return ServerQuery.instance;
  }

  public async getServerByProfile({
    profileId,
  }: {
    profileId: ICurrentUser["id"];
  }): Promise<IServer | null> {
    const findServer = await db.server.findFirst({
      where: {
        members: {
          some: {
            profileId: profileId,
          },
        },
      },
    });

    return findServer;
  }

  public async getAllServers({
    profileId,
  }: {
    profileId: ICurrentUser["id"];
  }): Promise<Array<IServer>> {
    const servers = await db.server.findMany({
      where: {
        profileId,
      },
    });

    return servers;
  }
}

export const { getServerByProfile, getAllServers } = ServerQuery.getInstance();
