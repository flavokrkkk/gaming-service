import { ChannelType } from "@prisma/client";
import { IsString, IsOptional, IsUrl, IsBoolean } from "class-validator";

export class CreateChannelDto {
  @IsString()
  name: string;

  @IsString()
  type: ChannelType;

  @IsBoolean()
  isPrivate: boolean;
}
