import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaModule } from "./prisma/prisma.module";
import { ChatModule } from "./chat/chat.module";
import { ServerModule } from "./server/server.module";
import { ChannelModule } from "./channel/channel.module";
import { MemberModule } from "./member/member.module";
import { UserModule } from "./user/user.module";
import { ConfigModule } from "@nestjs/config";
import { IS_DEVELOP_ENV } from "./libs/common/utils/develop.utils";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: !IS_DEVELOP_ENV,
    }),
    PrismaModule,
    ChatModule,
    ServerModule,
    ChannelModule,
    MemberModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
