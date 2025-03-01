import { db } from "@/shared/db";
import { IServer } from "../types/types";
import { ICurrentUser } from "@/entities/user/types/types";
import { Server } from "@prisma/client";

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
  }): Promise<IServer | null> {
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

    if (!server) return null;

    return server;
  }

  public async getServerByIdToChannels({
    serverId,
    profileId,
  }: {
    serverId: string;
    profileId: string;
  }): Promise<IServer | null> {
    const server = await db.server.findUnique({
      where: {
        id: serverId,
        members: {
          some: {
            profileId,
          },
        },
      },
      include: {
        channels: {
          where: {
            name: "general",
          },
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    if (!server) return null;

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
        members: {
          some: {
            profileId: profileId,
          },
        },
      },
    });

    return servers;
  }

  // public getCachedServers = unstable_cache(this.getAllServers, ["servers"], {
  //   tags: ["servers"],
  // });

  public async getServerByInviteCode({
    inviteCode,
    profileId,
  }: {
    inviteCode: string;
    profileId: string;
  }) {
    const server = await db.server.findFirst({
      where: {
        inviteCode,
        members: {
          some: {
            profileId,
          },
        },
      },
    });

    return server;
  }

  public async setInviteMember({
    inviteCode,
    profileId,
  }: {
    inviteCode: Server["inviteCode"];
    profileId: string;
  }) {
    const server = await db.server.update({
      where: {
        inviteCode,
      },
      data: {
        members: {
          create: [
            {
              profileId,
            },
          ],
        },
      },
    });

    return server;
  }
}

export const {
  getServerByProfile,
  getAllServers,
  getServerById,
  getServerChannel,
  getServerByInviteCode,
  getServerByIdToChannels,
  setInviteMember,
} = ServerQuery.getInstance();
