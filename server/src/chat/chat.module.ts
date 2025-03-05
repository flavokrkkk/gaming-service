import { Module } from "@nestjs/common";
import { ChatGateWay } from "./chat-gateway";
import { ServerService } from "@/server/server.service";
import { UserService } from "@/user/user.service";
import { ChannelService } from "@/channel/channel.service";
import { ChatService } from "./chat.service";
import { MessageService } from "@/message/message.service";

@Module({
  providers: [
    ChatGateWay,
    ServerService,
    UserService,
    ChannelService,
    MessageService,
    ChatService,
  ],
})
export class ChatModule {}
