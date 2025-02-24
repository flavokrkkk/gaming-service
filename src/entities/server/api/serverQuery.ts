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

  public async getServerById({
    serverId,
    profileId,
  }: {
    serverId: string;
    profileId: string;
  }): Promise<IServer> {
    const server = await db.server.findUnique({
      where: {
        id: serverId,
        members: {
          some: {
            profileId,
          },
        },
      },
    });

    if (!server) throw new Error("Server not found!");

    return server;
  }

  public async getServerChannel({
    serverId,
  }: {
    serverId: string;
  }): Promise<IServer> {
    const channels = await db.server.findUnique({
      where: {
        id: serverId,
      },
      include: {
        channels: {
          orderBy: {
            createdAt: "asc",
          },
        },
        members: {
          include: {
            profile: true,
          },
          orderBy: {
            role: "asc",
          },
        },
      },
    });

    if (!channels) throw new Error("Channels not found!");

    return channels;
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

export const {
  getServerByProfile,
  getAllServers,
  getServerById,
  getServerChannel,
} = ServerQuery.getInstance();
