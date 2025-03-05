import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { CreateMessageDto } from "./dto/create-message.dto";
import { UpdateMessageDto } from "./dto/update-message.dto";
import { PrismaService } from "@/prisma/prisma.service";
import { EMessagesParams } from "@/libs/common/utils/messages.util";
import { Message } from "@prisma/client";
import { fetchFileType } from "@/libs/common/files/fetchFileType";
import { ServerService } from "@/server/server.service";

@Injectable()
export class MessageService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async createChannelMessage({
    content,
    fileUrl,
    channelId,
    memberId,
  }: CreateMessageDto) {
    const message = await this.prismaService.message.create({
      data: {
        content: content,
        fileUrl: fileUrl,
        channelId: channelId,
        memberId: memberId,
      },
      include: {
        member: {
          include: {
            profile: true,
          },
        },
      },
    });

    if (!message)
      throw new InternalServerErrorException("Intenal server error!");

    return message;
  }

  async getMessages({
    cursor,
    channelId,
  }: {
    cursor: string | null;
    channelId: string;
  }): Promise<{ items: Array<Message>; nextCursor: string | null }> {
    const messages = await this.prismaService.message.findMany({
      take: EMessagesParams.MESSAGES_BATCH,
      ...(cursor && { skip: 1, cursor: { id: cursor } }),
      where: { channelId },
      include: { member: { include: { profile: true } } },
      orderBy: { createdAt: "desc" },
    });

    const nextCursor =
      messages.length === EMessagesParams.MESSAGES_BATCH
        ? messages[EMessagesParams.MESSAGES_BATCH - 1].id
        : null;

    const items = await Promise.all(
      messages.map(async (message) => {
        if (message.fileUrl) {
          const fileType = await fetchFileType(message.fileUrl);
          return {
            ...message,
            fileUrl: { url: message.fileUrl, type: fileType },
          };
        }
        return message;
      })
    );

    return { items: items as Array<Message>, nextCursor };
  }

  public async getMessageByChannel({
    messageId,
    channelId,
  }: {
    messageId: string;
    channelId: string;
  }): Promise<Message> {
    if (!messageId || !channelId) {
      throw new BadRequestException("MessageID and ChannelID  is missing!");
    }

    const message = await this.prismaService.message.findFirst({
      where: {
        id: messageId as string,
        channelId: channelId as string,
      },
      include: {
        member: {
          include: {
            profile: true,
          },
        },
      },
    });

    return message;
  }

  public async deleteMessage({ messageId }: { messageId: string }) {
    if (!messageId) {
      throw new BadRequestException("Message id is missing!");
    }

    const message = await this.prismaService.message.update({
      where: {
        id: messageId as string,
      },
      data: {
        fileUrl: null,
        content: "This message has been deleted",
        deleted: true,
      },
      include: {
        member: {
          include: {
            profile: true,
          },
        },
      },
    });

    return message;
  }

  public async updateMessage({
    messageId,
    content,
  }: {
    messageId: string;
    content: string;
  }): Promise<Message> {
    if (!messageId) {
      throw new BadRequestException("Message id is missing!");
    }

    const message = await this.prismaService.message.update({
      where: {
        id: messageId as string,
      },
      data: {
        content,
      },
      include: {
        member: {
          include: {
            profile: true,
          },
        },
      },
    });

    return message;
  }
}
