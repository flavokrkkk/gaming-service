import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { ChannelService } from "@/channel/channel.service";
import { PrismaService } from "@/prisma/prisma.service";
import { ServerService } from "@/server/server.service";
import { UserService } from "@/user/user.service";
import { MessageService } from "@/message/message.service";
import { Member, MemberRole, Message } from "@prisma/client";
import { fetchFileType } from "@/libs/common/files/fetchFileType";

@Injectable()
export class ChatService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
    private readonly serverService: ServerService,
    private readonly channelService: ChannelService,
    private readonly messageService: MessageService
  ) {}

  public checkMessageRoles({
    message,
    member,
  }: {
    message: Message;
    member: Member;
  }) {
    const isMessageOwner = message.memberId === member.id;
    const isAdmin = member.role === MemberRole.ADMIN;
    const isModerator = member.role === MemberRole.MODERATOR;
    const canModify = isMessageOwner || isAdmin || isModerator;

    return {
      isMessageOwner,
      isAdmin,
      isModerator,
      canModify,
    };
  }

  public async createNewMessage({
    channelId,
    serverId,
    sessionId,
    content,
    fileUrl,
  }: {
    channelId: string;
    serverId: string;
    sessionId: string;
    content: string;
    fileUrl?: string;
  }) {
    const profile = await this.userService.getCurrentProfileById({
      profileId: sessionId,
    });

    if (!serverId) {
      throw new BadRequestException("Server id is missing!");
    }

    if (!channelId) {
      throw new BadRequestException("Channel id is missing!");
    }

    if (!content) {
      throw new BadRequestException("Content is missing!");
    }
    const server = await this.serverService.getServerWithMembers({
      profileId: profile.id,
      serverId: serverId,
    });

    const channel = await this.channelService.getChannelInServer({
      serverId: serverId,
      channelId: channelId,
    });

    if (!channel) {
      throw new NotFoundException("Server not found!");
    }

    const member = server.members.find(
      (member) => member.profileId === profile.id
    );

    if (!member) {
      throw new NotFoundException("Member not found!");
    }

    const message = await this.messageService.createChannelMessage({
      channelId,
      memberId: member.id,
      content,
      fileUrl,
    });

    if (message.fileUrl) {
      const fileType = fetchFileType(message.fileUrl);

      return {
        ...message,
        fileUrl: {
          url: message.fileUrl,
          type: fileType,
        },
      };
    }

    return message;
  }

  public async changeMessage({
    serverId,
    profileId,
    channelId,
    messageId,
    content,
    type,
  }: {
    serverId: string;
    messageId: string;
    profileId: string;
    channelId: string;
    content?: string;
    type: "delete" | "edit";
  }) {
    const server = await this.serverService.getServerWithMembers({
      serverId,
      profileId,
    });

    if (!server) {
      throw new NotFoundException("Server not found!");
    }

    const channel = await this.channelService.getChannelInServer({
      serverId: serverId,
      channelId: channelId,
    });

    if (!channel) {
      throw new NotFoundException("Channel not found!");
    }

    const member = server.members.find(
      (member) => member.profileId === profileId
    );

    if (!member) {
      throw new NotFoundException("Member not found!");
    }

    let message = await this.messageService.getMessageByChannel({
      messageId,
      channelId,
    });

    if (!message || message.deleted) {
      throw new NotFoundException("Message not found!");
    }

    const { isAdmin, isMessageOwner, isModerator, canModify } =
      this.checkMessageRoles({ message, member });

    if (!canModify) {
      throw new UnauthorizedException("Unauthorized");
    }

    if (type === "delete") {
      message = await this.messageService.deleteMessage({ messageId });
    }

    if (type === "edit") {
      if (!isMessageOwner) {
        throw new UnauthorizedException("Unauthorized");
      }

      message = await this.messageService.updateMessage({ content, messageId });
    }

    return message;
  }
}
