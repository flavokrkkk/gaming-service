import { db } from "@/shared/db";

class ChannelQuery {
  private static instance: ChannelQuery;

  public static getInstance(): ChannelQuery {
    if (!ChannelQuery.instance) {
      ChannelQuery.instance = new ChannelQuery();
    }

    return ChannelQuery.instance;
  }

  public async getChannelById({ channelId }: { channelId: string }) {
    const channel = await db.channel.findUnique({
      where: {
        id: channelId,
      },
    });

    return channel;
  }
}

export const { getChannelById } = ChannelQuery.getInstance();
