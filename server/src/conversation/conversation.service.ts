import { Injectable } from "@nestjs/common";
import { CreateConversationDto } from "./dto/create-conversation.dto";
import { UpdateConversationDto } from "./dto/update-conversation.dto";
import { PrismaService } from "@/prisma/prisma.service";

@Injectable()
export class ConversationService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async create({ memberOneId, memberTwoId }: CreateConversationDto) {
    return await this.prismaService.conversation.create({
      data: {
        memberOneId,
        memberTwoId,
      },
      include: {
        memberOne: {
          include: {
            profile: true,
          },
        },
        memberTwo: {
          include: {
            profile: true,
          },
        },
      },
    });
  }

  public async findOne({ memberOneId, memberTwoId }: CreateConversationDto) {
    return await this.prismaService.conversation.findFirst({
      where: {
        AND: [{ memberOneId }, { memberTwoId }],
      },
      include: {
        memberOne: {
          include: {
            profile: true,
          },
        },
        memberTwo: {
          include: {
            profile: true,
          },
        },
      },
    });
  }

  public async getOrCreateConversation({
    memberOneId,
    memberTwoId,
  }: {
    memberOneId: string;
    memberTwoId: string;
  }) {
    let conversation =
      (await this.findOne({
        memberOneId,
        memberTwoId,
      })) || (await this.findOne({ memberTwoId, memberOneId }));
    if (!conversation) {
      conversation = await this.create({
        memberOneId,
        memberTwoId,
      });
    }
    return conversation;
  }
}
