import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server } from "socket.io";
import { ChatService } from "./chat.service";

@WebSocketGateway(3002, { cors: { origin: "*" } })
export class ChatGateWay {
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer() server: Server;

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
    const message = await this.chatService.createNewMessage({
      ...query,
      ...requestBody,
    });

    this.server.emit("newMessage", message);
  }

  @SubscribeMessage("deleteMessage")
  async handleDeleteMessage(
    @MessageBody()
    {
      messageId,
      serverId,
      sessionId: profileId,
      channelId,
    }: {
      channelId: string;
      serverId: string;
      sessionId: string;
      messageId: string;
    }
  ) {
    console.log({
      serverId,
      profileId,
      channelId,
      messageId,
    });
    const message = await this.chatService.changeMessage({
      serverId,
      profileId,
      channelId,
      messageId,
      type: "delete",
    });

    this.server.emit("deleteMessage", message);
  }

  @SubscribeMessage("updateMessage")
  async handleUpdateMessage(
    @MessageBody()
    {
      messageId,
      serverId,
      sessionId: profileId,
      channelId,
      content,
    }: {
      channelId: string;
      serverId: string;
      sessionId: string;
      messageId: string;
      content: string;
    }
  ) {
    const message = await this.chatService.changeMessage({
      serverId,
      profileId,
      channelId,
      messageId,
      type: "edit",
      content,
    });

    this.server.emit("updateMessage", message);
  }
}
