import axios from "axios";
import qs from "query-string";
import { IChangeMemberRequest } from "../types/types";
import { IServer } from "@/entities/server";

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
    const url = qs.stringifyUrl({
      url: `/api/members/${memberId}`,
      query: {
        serverId,
      },
    });

    const { data } = await axios.patch<IServer>(url, { role });
    return data;
  }

  public async deleteMember(
    requestBody: Partial<IChangeMemberRequest>
  ): Promise<IServer> {
    const url = qs.stringifyUrl({
      url: `/api/members/${requestBody.memberId}`,
      query: {
        serverId: requestBody.serverId,
      },
    });

    const { data } = await axios.delete<IServer>(url);

    return data;
  }
}

export const { changeMemberRole, deleteMember } = MemberService.getInstance();
