import qs from "query-string";
import { IChannel, IChannelRequest } from "../types/types";
import { IServer } from "@/entities/server";
import { getSessionUser } from "@/entities/session/libs/sessionService";
import { axiosInstance } from "@/shared/api/baseQuery";

class ChannelService {
  private static instance: ChannelService;

  public static getInstance(): ChannelService {
    if (!ChannelService.instance) {
      ChannelService.instance = new ChannelService();
    }

    return ChannelService.instance;
  }

  public async createChannel(requestBody: IChannelRequest): Promise<IServer> {
    const profileId = await getSessionUser();

    const url = qs.stringifyUrl({
      url: "/api/v1/channel",
      query: {
        serverId: requestBody.serverId,
        profileId,
      },
    });

    const { data } = await axiosInstance.post(url, requestBody);

    return data;
  }

  public async deleteChannel(
    requestBody: Partial<IChannel> & { id: string; serverId: string }
  ) {
    const profileId = await getSessionUser();

    const url = qs.stringifyUrl({
      url: `/api/v1/channel/${requestBody.id}`,
      query: {
        serverId: requestBody.serverId,
        profileId,
      },
    });

    const { data } = await axiosInstance.delete(url);

    return data;
  }

  public async updateChannel(
    requestBody: IChannelRequest & { channelId: string }
  ): Promise<IServer> {
    const profileId = await getSessionUser();

    const url = qs.stringifyUrl({
      url: `/api/v1/channel/${requestBody.channelId}`,
      query: {
        serverId: requestBody.serverId,
        profileId,
      },
    });

    const { data } = await axiosInstance.patch(url, requestBody);

    return data;
  }

  public async getChannelById({
    channelId,
  }: {
    channelId: string;
  }): Promise<IChannel> {
    console.log(channelId);
    const { data } = await axiosInstance.get<IChannel>(
      `api/v1/channel/${channelId}`
    );

    return data;
  }
}
export const { createChannel, deleteChannel, updateChannel, getChannelById } =
  ChannelService.getInstance();
