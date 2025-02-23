import { IServer, IServerRequest } from "../types/types";
import axios from "axios";

class ServerServiceClient {
  private static instance: ServerServiceClient;

  public static getInstance(): ServerServiceClient {
    if (!ServerServiceClient.instance) {
      ServerServiceClient.instance = new ServerServiceClient();
    }

    return ServerServiceClient.instance;
  }

  public async createServer(requestBody: IServerRequest): Promise<IServer> {
    const { data } = await axios.post<IServer>("/api/servers/", requestBody);

    return data;
  }
}

export const { createServer } = ServerServiceClient.getInstance();
