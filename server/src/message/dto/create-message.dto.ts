import { IsNotEmpty, IsString } from "class-validator";

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  fileUrl: string;

  @IsNotEmpty()
  channelId: string;

  @IsNotEmpty()
  memberId: string;
}
