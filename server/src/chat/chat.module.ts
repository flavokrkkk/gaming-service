import { Module } from "@nestjs/common";
import { ChatGateWay } from "./chat-gateway";

@Module({
  providers: [ChatGateWay],
})
export class ChatModule {}
