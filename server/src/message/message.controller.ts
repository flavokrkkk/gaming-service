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
  UnauthorizedException,
  BadRequestException,
} from "@nestjs/common";
import { MessageService } from "./message.service";
import { CreateMessageDto } from "./dto/create-message.dto";

@Controller("message")
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.createChannelMessage(createMessageDto);
  }

  @Get()
  async getMessages(
    @Query("cursor") cursor: string | null,
    @Query("channelId") channelId: string,
    @Query("profileId") profileId: string
  ) {
    if (!profileId) throw new UnauthorizedException("Unauthorized");
    if (!channelId) throw new BadRequestException("Channel ID Missing");
    const data = await this.messageService.getMessages({ cursor, channelId });
    console.log(data);
    return data;
  }
}
