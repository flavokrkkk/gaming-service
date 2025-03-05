import { IsString } from "class-validator";

export class UpdateInviteLinkDto {
  @IsString()
  inviteCode: string;
}
