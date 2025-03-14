import { db } from "@/shared/db";

class MemberQuery {
  private static instance: MemberQuery;

  public static getInstance(): MemberQuery {
    if (!MemberQuery.instance) {
      MemberQuery.instance = new MemberQuery();
    }

    return MemberQuery.instance;
  }

  public async getChannelMembers({
    serverId,
    profileId,
  }: {
    serverId: string;
    profileId: string;
  }) {
    const member = await db.member.findFirst({
      where: {
        serverId: serverId,
        profileId: profileId,
      },
    });

    return member;
  }

  public async getChannelMembersByProfile({
    serverId,
    profileId,
  }: {
    serverId: string;
    profileId: string;
  }) {
    const member = await db.member.findFirst({
      where: {
        serverId: serverId,
        profileId: profileId,
      },
      include: {
        profile: true,
      },
    });

    return member;
  }
}

export const { getChannelMembers, getChannelMembersByProfile } =
  MemberQuery.getInstance();
