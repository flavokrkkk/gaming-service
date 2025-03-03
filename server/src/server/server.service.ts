import { PrismaService } from "@/prisma/prisma.service";
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { MemberRole, Profile, Server } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { CreateServerDto } from "./dto/create-server.dto";

@Injectable()
export class ServerService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getServerById({
    serverId,
    profileId,
  }: {
    serverId: Server["id"];
    profileId: Profile["id"];
  }): Promise<Server> {
    if (!serverId) throw new BadRequestException("Serverid is missing!");

    const server = await this.prismaService.server.findFirst({
      where: {
        id: serverId,
        members: {
          some: {
            profileId,
          },
        },
      },
    });

    if (!server) throw new NotFoundException("Server not found!");

    return server;
  }

  public async getServerByIdChannels({
    serverId,
    profileId,
  }: {
    serverId: Server["id"];
    profileId: Profile["id"];
  }): Promise<Server> {
    if (!serverId) throw new BadRequestException("Serverid is missing!");

    const server = await this.prismaService.server.findUnique({
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

    if (!server) throw new NotFoundException("Server not found!");

    const initialChannel = server.channels[0];

    if (initialChannel.name !== "general")
      throw new BadRequestException("Channel name general is missing!");

    return server;
  }

  public async getServerChannel({
    serverId,
  }: {
    serverId: Server["id"];
  }): Promise<Server> {
    if (!serverId) throw new BadRequestException("Serverid is missing!");

    const channels = await this.prismaService.server.findUnique({
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

    if (!channels) throw new NotFoundException("No channels found!");

    return channels;
  }

  public async getAllServers({
    profileId,
  }: {
    profileId: Profile["id"];
  }): Promise<Array<Server>> {
    const servers = await this.prismaService.server.findMany({
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

  public async getServerByInviteCode({
    inviteCode,
    profileId,
  }: {
    inviteCode: string;
    profileId: Profile["id"];
  }) {
    const server = await this.prismaService.server.findFirst({
      where: {
        inviteCode,
        members: {
          some: {
            profileId,
          },
        },
      },
    });

    if (!server) throw new NotFoundException("Server not found!");

    return server;
  }

  public async setInviteMember({
    inviteCode,
    profileId,
  }: {
    inviteCode: Server["inviteCode"];
    profileId: Profile["id"];
  }) {
    const server = await this.prismaService.server.update({
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

    if (!server) throw new NotFoundException("Server not found!");

    return server;
  }

  public async updateServerInviteLink({
    serverId,
    profileId,
  }: {
    serverId: Server["id"];
    profileId: Profile["id"];
  }) {
    if (!serverId) throw new BadRequestException("Serverid is missing!");

    const server = await this.prismaService.server.update({
      where: {
        id: serverId,
        profileId: profileId,
      },
      data: {
        inviteCode: uuidv4(),
      },
    });

    if (!server) throw new NotFoundException("Server not found!");

    return server;
  }

  public async leaveFromServer({
    serverId,
    profileId,
  }: {
    serverId: Server["id"];
    profileId: Profile["id"];
  }) {
    if (!serverId) throw new BadRequestException("Serverid is required!");

    const server = await this.prismaService.server.update({
      where: {
        id: serverId,
        profileId: {
          not: profileId,
        },
        members: {
          some: {
            profileId: profileId,
          },
        },
      },
      data: {
        members: {
          deleteMany: {
            profileId: profileId,
          },
        },
      },
    });

    if (!server) throw new NotFoundException("Server not found!");

    return server;
  }

  public async createServer({
    imageUrl,
    name,
    profileId,
  }: CreateServerDto & { profileId: Profile["id"] }): Promise<Server> {
    const server = await this.prismaService.server.create({
      data: {
        name,
        imageUrl,
        profileId: profileId,
        inviteCode: uuidv4(),
        channels: {
          create: [
            {
              name: "general",
              profileId: profileId,
            },
          ],
        },
        members: {
          create: [
            {
              profileId: profileId,
              role: MemberRole.ADMIN,
            },
          ],
        },
      },
    });

    if (!server) throw new BadRequestException("Server IS NOT created!");

    return server;
  }

  public async updateServer({
    imageUrl,
    name,
    profileId,
    serverId,
  }: CreateServerDto & { profileId: Profile["id"]; serverId: Server["id"] }) {
    if (!serverId) throw new BadRequestException("Serverid is required!");

    const server = await this.prismaService.server.update({
      where: {
        id: serverId,
        profileId: profileId,
      },
      data: {
        name,
        imageUrl,
      },
    });

    if (!server) throw new BadRequestException("Server IS NOT updated!");

    return server;
  }

  public async deleteServer({
    serverId,
    profileId,
  }: {
    serverId: Server["id"];
    profileId: Profile["id"];
  }) {
    if (!serverId) throw new BadRequestException("Serverid is required!");

    const server = await this.prismaService.server.delete({
      where: {
        id: serverId,
        profileId: profileId,
      },
    });

    return server;
  }
}
