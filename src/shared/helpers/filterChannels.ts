import { IServer } from "@/entities";
import { IChannel } from "@/entities/channel/types/types";
import { ChannelType } from "@prisma/client";

export const filterChannelByType = (server: IServer) => {
  const filterChannels = server.channels?.reduce(
    (acc, item) => {
      if (item.type === ChannelType.AUDIO) {
        acc.audioChannels.push(item);
      }

      if (item.type === ChannelType.TEXT) {
        acc.textChannels.push(item);
      }

      if (item.type === ChannelType.VIDEO) {
        acc.videoChannels.push(item);
      }

      return acc;
    },
    {
      textChannels: [] as Array<IChannel>,
      audioChannels: [] as Array<IChannel>,
      videoChannels: [] as Array<IChannel>,
    }
  );

  return filterChannels;
};
