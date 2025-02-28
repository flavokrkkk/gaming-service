import { IServer } from "@/entities";
import { IChannel } from "@/entities/channel/types/types";
import { roleIconMap } from "@/features/server/libs/utils";
import { iconMap } from "@/features/server/libs/utils/iconsMap";
import { IChannelSearch } from "@/features/server/types/types";
import { ChannelType } from "@prisma/client";

export const filterChannelByType = (server: IServer, profileId: string) => {
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

  const members = server.members?.filter(
    (member) => member.profileId !== profileId
  );

  const channelTypes: Array<IChannelSearch> = [
    {
      label: "Text Channels",
      type: "channel",
      data: filterChannels?.textChannels.map((channel) => ({
        id: channel.id,
        name: channel.name,
        icon: iconMap[channel.type],
      })),
    },
    {
      label: "Voice Channels",
      type: "channel",
      data: filterChannels?.audioChannels.map((channel) => ({
        id: channel.id,
        name: channel.name,
        icon: iconMap[channel.type],
      })),
    },
    {
      label: "Video Channels",
      type: "channel",
      data: filterChannels?.videoChannels.map((channel) => ({
        id: channel.id,
        name: channel.name,
        icon: iconMap[channel.type],
      })),
    },
    {
      label: "Members",
      type: "member",
      data: members?.map((member) => ({
        id: member.id,
        name: member.profile.name,
        icon: roleIconMap[member.role],
      })),
    },
  ];

  return channelTypes;
};
