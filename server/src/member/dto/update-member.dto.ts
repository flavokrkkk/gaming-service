import { MemberRole } from "@prisma/client";
import { IsString } from "class-validator";

export class UpdateMemberDto {
  @IsString()
  role: MemberRole;
}
