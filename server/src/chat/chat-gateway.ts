import { PrismaService } from "@/prisma/prisma.service";
import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway(3002, { cors: { origin: "*" } })
export class ChatGateWay implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly prismaService: PrismaService) {}

  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    // console.log("New User connected", client.id);

    this.server.emit("user-joined", {
      message: `User joined the chat: ${client.id}`,
    });
  }

  handleDisconnect(client: Socket) {
    // console.log(" User disconnected", client.id);

    this.server.emit("user-left", {
      message: `User left the chat: ${client.id}`,
    });
  }

  @SubscribeMessage("newMessage")
  async handleNewMessage(
    @MessageBody()
    {
      query,
      requestBody,
    }: {
      query: { channelId: string; serverId: string; sessionId: string };
      requestBody: { content: string; fileUrl?: string };
    }
  ) {
    const profile = await this.prismaService.profile.findUnique({
      where: {
        id: query.sessionId,
      },
    });
    // console.log(profile);
    if (!profile) {
      throw new UnauthorizedException("Unauthorized");
    }

    if (!query.serverId) {
      throw new BadRequestException("Server id is missing!");
    }

    if (!query.channelId) {
      throw new BadRequestException("Channel id is missing!");
    }

    if (!requestBody.content) {
      throw new BadRequestException("Content is missing!");
    }
    const server = await this.prismaService.server.findFirst({
      where: {
        id: query.serverId,
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
      include: {
        members: true,
      },
    });

    console.log(query);

    const servern = await this.prismaService.server.findFirst({
      where: {
        id: "cae3688e-2cc9-4df1-8038-6bc6f849a082",
        // members: {
        //   some: {
        //     profileId: profile.id,
        //   },
        // },
      },
      include: {
        members: true,
      },
    });

    console.log(servern, "server");

    if (!server) {
      throw new NotFoundException("Server not found!");
    }

    const channel = await this.prismaService.channel.findFirst({
      where: {
        id: query.channelId,
        serverId: query.serverId,
      },
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

    const message = await this.prismaService.message.create({
      data: {
        content: requestBody.content,
        fileUrl: requestBody.fileUrl,
        channelId: query.channelId,
        memberId: member.id,
      },
      include: {
        member: {
          include: {
            profile: true,
          },
        },
      },
    });
    this.server.emit("newMessage", message);
  }
}
