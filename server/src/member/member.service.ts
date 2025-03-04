import { PrismaService } from "@/prisma/prisma.service";
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { Member, MemberRole, Profile, Server } from "@prisma/client";
import { UpdateMemberDto } from "./dto/update-member.dto";

@Injectable()
export class MemberService {
  constructor(private readonly prismaService: PrismaService) {}

  public async deleteMember({
    memberId,
    profileId,
    serverId,
  }: {
    memberId: Member["id"];
    profileId: Profile["id"];
    serverId: Server["id"];
  }) {
    if (!serverId) throw new BadRequestException("Server ID is required!");

    if (!memberId) throw new BadRequestException("Member ID is required!");

    const server = await this.prismaService.server.update({
      where: {
        id: serverId,
        profileId,
      },
      data: {
        members: {
          deleteMany: {
            id: memberId,
            profileId: {
              not: profileId,
            },
          },
        },
      },
      include: {
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

    if (!server) throw new InternalServerErrorException("Internal Error");

    return server;
  }

  public async updateMember({
    memberId,
    profileId,
    serverId,
    role,
  }: {
    memberId: Member["id"];
    profileId: Profile["id"];
    serverId: Server["id"];
  } & UpdateMemberDto) {
    if (!serverId) throw new BadRequestException("Server ID is required!");

    if (!memberId) throw new BadRequestException("Member ID is required!");

    const server = await this.prismaService.server.update({
      where: {
        id: serverId,
        profileId,
      },
      data: {
        members: {
          update: {
            where: {
              id: memberId,
              profileId: {
                not: profileId,
              },
            },
            data: {
              role,
            },
          },
        },
      },
      include: {
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

    if (!server) throw new InternalServerErrorException("Internal Error");

    return server;
  }

  public async getChannelMember({
    serverId,
    profileId,
  }: {
    serverId: string;
    profileId: string;
  }) {
    if (!serverId) throw new BadRequestException("Server ID is required!");

    const member = await this.prismaService.member.findFirst({
      where: {
        serverId: serverId,
        profileId: profileId,
      },
    });

    if (!member) throw new InternalServerErrorException("Internal Error");

    return member;
  }

  public async getChannelMembersByProfile({
    serverId,
    profileId,
  }: {
    serverId: string;
    profileId: string;
  }) {
    if (!serverId) throw new BadRequestException("Server ID is required!");

    const member = await this.prismaService.member.findFirst({
      where: {
        serverId: serverId,
        profileId: profileId,
      },
      include: {
        profile: true,
      },
    });

    if (!member) throw new InternalServerErrorException("Internal Error");

    return member;
  }
}
