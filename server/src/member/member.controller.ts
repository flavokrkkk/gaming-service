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
import { MemberService } from "./member.service";
import { UpdateMemberDto } from "./dto/update-member.dto";
import { Member, Profile, Server } from "@prisma/client";

@Controller("member")
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Patch(":memberId")
  update(
    @Param("memberId") memberId: string,
    @Body() updateMemberDto: UpdateMemberDto,
    @Query("serverId") serverId: Server["id"],
    @Query("profileId") profileId: Profile["id"]
  ) {
    return this.memberService.updateMember({
      ...updateMemberDto,
      memberId,
      serverId,
      profileId,
    });
  }

  @Delete(":memberId")
  remove(
    @Param("memberId") memberId: Member["id"],
    @Query("serverId") serverId: Server["id"],
    @Query("profileId") profileId: Profile["id"]
  ) {
    return this.memberService.deleteMember({ memberId, serverId, profileId });
  }

  @Get("current-member")
  currentMember(
    @Query("serverId") serverId: Server["id"],
    @Query("profileId") profileId: Profile["id"]
  ) {
    return this.memberService.getChannelMember({ serverId, profileId });
  }

  @Get("member-with-profile")
  memberWithProfile(
    @Query("serverId") serverId: Server["id"],
    @Query("profileId") profileId: Profile["id"]
  ) {
    return this.memberService.getChannelMembersByProfile({
      serverId,
      profileId,
    });
  }
}
