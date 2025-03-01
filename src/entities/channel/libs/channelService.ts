import axios from "axios";
import qs from "query-string";
import { IChannel, IChannelRequest } from "../types/types";
import { IServer } from "@/entities/server";

class ChannelService {
  private static instance: ChannelService;

  public static getInstance(): ChannelService {
    if (!ChannelService.instance) {
      ChannelService.instance = new ChannelService();
    }

    return ChannelService.instance;
  }

  public async createChannel(requestBody: IChannelRequest): Promise<IServer> {
    const url = qs.stringifyUrl({
      url: "/api/channels",
      query: {
        serverId: requestBody.serverId,
      },
    });

    const { data } = await axios.post(url, requestBody);

    return data;
  }

  public async deleteChannel(
    requestBody: Partial<IChannel> & { id: string; serverId: string }
  ) {
    const url = qs.stringifyUrl({
      url: `/api/channels/${requestBody.id}`,
      query: {
        serverId: requestBody.serverId,
      },
    });

    const { data } = await axios.delete(url);

    return data;
  }

  public async updateChannel(
    requestBody: IChannelRequest & { channelId: string }
  ): Promise<IServer> {
    const url = qs.stringifyUrl({
      url: `/api/channels/${requestBody.channelId}`,
      query: {
        serverId: requestBody.serverId,
      },
    });

    const { data } = await axios.patch(url, requestBody);

    return data;
  }
}

export const { createChannel, deleteChannel, updateChannel } =
  ChannelService.getInstance();
