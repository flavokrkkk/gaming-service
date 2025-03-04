import qs from "query-string";
import { IChangeMemberRequest, IMember } from "../types/types";
import { IServer } from "@/entities/server";
import { getSessionUser } from "@/entities/session/libs/sessionService";
import { axiosInstance } from "@/shared/api/baseQuery";

class MemberService {
  private static instance: MemberService;

  public static getInstance(): MemberService {
    if (!MemberService.instance) {
      MemberService.instance = new MemberService();
    }

    return MemberService.instance;
  }

  public async changeMemberRole({
    memberId,
    serverId,
    role,
  }: IChangeMemberRequest): Promise<IServer> {
    const profileId = await getSessionUser();

    const url = qs.stringifyUrl({
      url: `/api/v1/member/${memberId}`,
      query: {
        serverId,
        profileId,
      },
    });

    const { data } = await axiosInstance.patch<IServer>(url, { role });
    return data;
  }

  public async deleteMember(
    requestBody: Partial<IChangeMemberRequest>
  ): Promise<IServer> {
    const profileId = await getSessionUser();

    const url = qs.stringifyUrl({
      url: `/api/v1/member/${requestBody.memberId}`,
      query: {
        serverId: requestBody.serverId,
        profileId,
      },
    });

    const { data } = await axiosInstance.delete<IServer>(url);

    return data;
  }

  public async getChannelMembers({
    serverId,
    profileId,
  }: {
    serverId: string;
    profileId: string;
  }) {
    const url = qs.stringifyUrl({
      url: `/api/v1/member/current-member`,
      query: {
        serverId,
        profileId,
      },
    });

    const { data } = await axiosInstance.get<IMember>(url);
    return data;
  }

  public async getChannelMembersByProfile({
    serverId,
    profileId,
  }: {
    serverId: string;
    profileId: string;
  }) {
    const url = qs.stringifyUrl({
      url: `/api/v1/member/member-with-profile`,
      query: {
        serverId,
        profileId,
      },
    });

    const { data } = await axiosInstance.get<IMember>(url);
    return data;
  }
}

export const {
  changeMemberRole,
  deleteMember,
  getChannelMembersByProfile,
  getChannelMembers,
} = MemberService.getInstance();
