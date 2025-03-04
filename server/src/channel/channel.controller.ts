import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
} from "@nestjs/common";
import { ChannelService } from "./channel.service";
import { CreateChannelDto } from "./dto/create-channel.dto";
import { Channel, Profile, Server } from "@prisma/client";
import { Request } from "express";

@Controller("channel")
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Post()
  create(
    @Body() createChannelDto: CreateChannelDto,
    @Query("serverId") serverId: Server["id"],
    @Query("profileId") profileId: Profile["id"]
  ) {
    return this.channelService.createChannel({
      ...createChannelDto,
      serverId,
      profileId,
    });
  }

  @Get(":channelId")
  findOne(@Param("channelId") channelId: Channel["id"], @Req() req: Request) {
    return this.channelService.getChannelById({ channelId });
  }

  @Patch(":channelId")
  update(
    @Body() createChannelDto: CreateChannelDto,
    @Query("serverId") serverId: Server["id"],
    @Query("profileId") profileId: Profile["id"],
    @Param("channelId") channelId: Channel["id"]
  ) {
    return this.channelService.updateChannel({
      ...createChannelDto,
      serverId,
      profileId,
      channelId,
    });
  }

  @Delete(":channelId")
  remove(
    @Query("serverId") serverId: Server["id"],
    @Query("profileId") profileId: Profile["id"],
    @Param("channelId") channelId: Channel["id"]
  ) {
    return this.channelService.deleteChannel({
      serverId,
      channelId,
      profileId,
    });
  }
}
