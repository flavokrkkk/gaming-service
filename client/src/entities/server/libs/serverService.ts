import { getSessionUser } from "@/entities/session/libs/sessionService";
import { IServer, IServerRequest } from "../types/types";
import qs from "query-string";
import { ICurrentUser } from "@/entities/user";
import { Server } from "@prisma/client";
import { axiosInstance } from "@/shared/api/baseQuery";

class ServerServiceClient {
  private static instance: ServerServiceClient;

  public static getInstance(): ServerServiceClient {
    if (!ServerServiceClient.instance) {
      ServerServiceClient.instance = new ServerServiceClient();
    }

    return ServerServiceClient.instance;
  }

  public async createServer(requestBody: IServerRequest): Promise<IServer> {
    const profileId = await getSessionUser();

    const url = qs.stringifyUrl({
      url: "/api/v1/server",
      query: { profileId },
    });

    const { data } = await axiosInstance.post<IServer>(url, requestBody);

    return data;
  }

  public async updateInviteLink({
    serverId,
  }: {
    serverId: string;
  }): Promise<IServer> {
    const profileId = await getSessionUser();

    const url = qs.stringifyUrl({
      url: `/api/v1/server/${serverId}/invite-code`,
      query: { profileId },
    });

    const { data } = await axiosInstance.patch<IServer>(url);

    return data;
  }

  public async updateServerSettings(
    requestBody: IServerRequest & { serverId: string }
  ): Promise<IServer> {
    const { serverId, ...body } = requestBody;

    const profileId = await getSessionUser();

    const url = qs.stringifyUrl({
      url: `/api/v1/server/${serverId}`,
      query: { profileId },
    });

    const { data } = await axiosInstance.patch<IServer>(url, body);

    return data;
  }

  public async serverLeave({
    serverId,
  }: {
    serverId: string;
  }): Promise<IServer> {
    const profileId = await getSessionUser();

    const url = qs.stringifyUrl({
      url: `/api/v1/server/${serverId}/leave`,
      query: { profileId },
    });

    const { data } = await axiosInstance.post(url);
    return data;
  }

  public async deleteServer({
    serverId,
  }: {
    serverId: string;
  }): Promise<IServer> {
    const profileId = await getSessionUser();

    const url = qs.stringifyUrl({
      url: `/api/v1/server/${serverId}`,
      query: { profileId },
    });

    const { data } = await axiosInstance.delete(url);
    return data;
  }

  public async getServerById({
    serverId,
    profileId,
  }: {
    serverId: string;
    profileId: string;
  }): Promise<IServer | null> {
    const url = qs.stringifyUrl({
      url: `/api/v1/server/${serverId}`,
      query: { profileId },
    });

    const { data } = await axiosInstance.get(url);

    return data;
  }

  public async getAllServers({
    profileId,
  }: {
    profileId: ICurrentUser["id"];
  }): Promise<Array<IServer>> {
    const url = qs.stringifyUrl({
      url: `/api/v1/server`,
      query: { profileId },
    });

    const { data } = await axiosInstance.get(url);

    return data;
  }

  public async getServerByIdToChannels({
    serverId,
    profileId,
  }: {
    serverId: string;
    profileId: string;
  }): Promise<IServer | null> {
    const url = qs.stringifyUrl({
      url: `/api/v1/server/${serverId}/with-channels`,
      query: { profileId },
    });

    const { data } = await axiosInstance.get(url);

    return data;
  }

  public async getServerChannel({
    serverId,
  }: {
    serverId: string;
  }): Promise<IServer> {
    const { data } = await axiosInstance.get(
      `/api/v1/server/${serverId}/channels`
    );

    return data;
  }

  public async getServerByInviteCode({
    inviteCode,
    profileId,
  }: {
    inviteCode: string;
    profileId: string;
  }) {
    const url = qs.stringifyUrl({
      url: `/api/v1/server/invite-code`,
      query: { profileId, inviteCode },
    });

    const { data } = await axiosInstance.get(url);

    return data;
  }

  public async setInviteMember({
    inviteCode,
    profileId,
  }: {
    inviteCode: Server["inviteCode"];
    profileId: string;
  }) {
    const url = qs.stringifyUrl({
      url: `/api/v1/server/invite-code`,
      query: { profileId },
    });

    const { data } = await axiosInstance.post(url, { inviteCode });

    return data;
  }
}

export const {
  getAllServers,
  getServerById,
  createServer,
  updateInviteLink,
  updateServerSettings,
  serverLeave,
  deleteServer,
  getServerByIdToChannels,
  getServerChannel,
  setInviteMember,
  getServerByInviteCode,
} = ServerServiceClient.getInstance();
