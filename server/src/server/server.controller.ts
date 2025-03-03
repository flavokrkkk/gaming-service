import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { ServerService } from "./server.service";
import { CreateServerDto } from "./dto/create-server.dto";
import { Profile, Server } from "@prisma/client";
import { UpdateInviteLinkDto } from "./dto/update-invite-link.dto";

@Controller("server")
export class ServerController {
  constructor(private readonly serverService: ServerService) {}

  @Post()
  create(
    @Body() createServerDto: CreateServerDto,
    @Query("profileId") profileId: Profile["id"]
  ) {
    return this.serverService.createServer({ ...createServerDto, profileId });
  }

  @Get()
  findAll(@Query("profileId") profileId: Profile["id"]) {
    return this.serverService.getAllServers({ profileId });
  }

  @Get(":serverId")
  findOne(
    @Param("serverId") serverId: Server["id"],
    @Query("profileId") profileId: Profile["id"]
  ) {
    console.log(serverId);
    return this.serverService.getServerById({ serverId, profileId });
  }

  @Patch(":serverId")
  update(
    @Param("serverId") serverId: string,
    @Body() updateServerDto: CreateServerDto,
    @Query("profileId") profileId: Profile["id"]
  ) {
    return this.serverService.updateServer({
      serverId,
      ...updateServerDto,
      profileId,
    });
  }

  @Delete(":serverId")
  remove(
    @Param("serverId") serverId: string,
    @Query("profileId") profileId: Profile["id"]
  ) {
    return this.serverService.deleteServer({ serverId, profileId });
  }

  @Get(":serverId/with-channels")
  getServerWithChannels(
    @Param("serverId") serverId: Server["id"],
    @Query("profileId") profileId: Profile["id"]
  ) {
    return this.serverService.getServerByIdChannels({ serverId, profileId });
  }

  @Get(":serverId/channels")
  getServerChannel(@Param("serverId") serverId: Server["id"]) {
    console.log(serverId);
    return this.serverService.getServerChannel({ serverId });
  }

  @Get("invite-code")
  getServerByInviteCode(
    @Query("inviteCode") inviteCode: string,
    @Query("profileId") profileId: Profile["id"]
  ) {
    return this.serverService.getServerByInviteCode({ inviteCode, profileId });
  }

  @Post("invite-code")
  setInviteMember(
    @Body() { inviteCode }: UpdateInviteLinkDto,
    @Query("profileId") profileId: Profile["id"]
  ) {
    return this.serverService.setInviteMember({ inviteCode, profileId });
  }

  @Patch(":serverId/invite-code")
  updateServerInviteLink(
    @Param("serverId") serverId: Server["id"],
    @Query("profileId") profileId: Profile["id"]
  ) {
    return this.serverService.updateServerInviteLink({ serverId, profileId });
  }

  @Post(":serverId/leave")
  leaveFromServer(
    @Param("serverId") serverId: Server["id"],
    @Query("profileId") profileId: Profile["id"]
  ) {
    return this.serverService.leaveFromServer({ serverId, profileId });
  }
}
