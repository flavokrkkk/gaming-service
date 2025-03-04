import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { CreateChannelDto } from "./dto/create-channel.dto";
import { PrismaService } from "@/prisma/prisma.service";
import { Channel, MemberRole } from "@prisma/client";

@Injectable()
export class ChannelService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getChannelById({ channelId }: { channelId: string }) {
    const channel = await this.prismaService.channel.findUnique({
      where: {
        id: channelId,
      },
    });

    if (!channel) throw new NotFoundException("Channel not found!");

    return channel;
  }

  public async createChannel({
    isPrivate,
    type,
    name,
    serverId,
    profileId,
  }: CreateChannelDto & { serverId: string; profileId: string }) {
    if (!serverId) throw new BadRequestException("Server ID is required!");

    if (name === "general") {
      throw new BadRequestException("Server name cannot be 'general'");
    }

    const server = await this.prismaService.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          create: {
            profileId,
            name,
            type,
            isPrivate,
          },
        },
      },
    });

    if (!server) throw new InternalServerErrorException("Internal Error");

    return server;
  }

  public async updateChannel({
    isPrivate,
    type,
    name,
    serverId,
    channelId,
    profileId,
  }: CreateChannelDto & {
    serverId: string;
    profileId: string;
    channelId: Channel["id"];
  }) {
    if (!serverId) throw new BadRequestException("Server ID is required!");

    if (!channelId) throw new BadRequestException("Channel ID is required!");

    if (name === "general") {
      throw new BadRequestException("Server name cannot be 'general'");
    }

    const server = await this.prismaService.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          update: {
            where: {
              id: channelId,
              NOT: {
                name: "general",
              },
            },
            data: {
              name,
              type,
              isPrivate,
            },
          },
        },
      },
    });

    if (!server) throw new InternalServerErrorException("Internal Error");

    return server;
  }

  public async deleteChannel({
    channelId,
    profileId,
    serverId,
  }: {
    serverId: string;
    profileId: string;
    channelId: Channel["id"];
  }) {
    if (!serverId) throw new BadRequestException("Server ID is required!");

    if (!channelId) throw new BadRequestException("Channel ID is required!");

    const server = await this.prismaService.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          delete: {
            id: channelId,
            name: {
              not: "general",
            },
          },
        },
      },
    });

    if (!server) throw new InternalServerErrorException("Internal Error");

    return server;
  }
}
