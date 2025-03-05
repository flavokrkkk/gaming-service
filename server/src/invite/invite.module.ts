import { ServerService } from "@/server/server.service";
import { Module } from "@nestjs/common";
import { InviteController } from "./invite.controller";

@Module({
  controllers: [InviteController],
  providers: [ServerService],
})
export class InviteModule {}
