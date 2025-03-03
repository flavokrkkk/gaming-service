import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaModule } from "./prisma/prisma.module";
import { ChatModule } from "./chat/chat.module";
import { ServerModule } from "./server/server.module";
import { ChannelModule } from "./channel/channel.module";
import { MemberModule } from './member/member.module';

@Module({
  imports: [PrismaModule, ChatModule, ServerModule, ChannelModule, MemberModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
