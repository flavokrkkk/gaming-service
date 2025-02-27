import axios from "axios";
import qs from "query-string";
import { IChannelRequest } from "../types/types";
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
}

export const { createChannel } = ChannelService.getInstance();
