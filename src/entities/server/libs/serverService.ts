import { db } from "@/shared/db";
import { IServer } from "../types/types";
import { ICurrentUser } from "@/entities/user/types/types";

class ServerService {
  private static instance: ServerService;

  public static getInstance(): ServerService {
    if (!ServerService.instance) {
      ServerService.instance = new ServerService();
    }

    return ServerService.instance;
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
}

export const { getServerByProfile } = ServerService.getInstance();
