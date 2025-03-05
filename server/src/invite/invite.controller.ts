import { ServerService } from "@/server/server.service";
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { Profile, Server } from "@prisma/client";
import { UpdateInviteLinkDto } from "./dto/update-invite-link.dto";

@Controller("invite")
export class InviteController {
  constructor(private readonly serverService: ServerService) {}

  @Get(":inviteCode")
  getServerByInviteCode(
    @Param("inviteCode") inviteCode: string,
    @Query("profileId") profileId: Profile["id"]
  ) {
    return this.serverService.getServerByInviteCode({ inviteCode, profileId });
  }

  @Post()
  setInviteMember(
    @Body() { inviteCode }: UpdateInviteLinkDto,
    @Query("profileId") profileId: Profile["id"]
  ) {
    return this.serverService.setInviteMember({ inviteCode, profileId });
  }

  @Patch(":serverId")
  updateServerInviteLink(
    @Param("serverId") serverId: Server["id"],
    @Query("profileId") profileId: Profile["id"]
  ) {
    return this.serverService.updateServerInviteLink({ serverId, profileId });
  }
}
