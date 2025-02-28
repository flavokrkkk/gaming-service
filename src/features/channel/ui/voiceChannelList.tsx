import { IServer } from "@/entities";
import { IChannel } from "@/entities/channel/types/types";
import ServerChannel from "@/features/server/ui/serverChannel";
import ServerSection from "@/features/server/ui/serverSection";
import { ChannelType, MemberRole } from "@prisma/client";
import React, { FC } from "react";

interface IVoiceChannelList {
  audioChannels: Array<IChannel>;
  server: IServer;
  role: MemberRole;
}

const VoiceChannelList: FC<IVoiceChannelList> = ({
  audioChannels,
  role,
  server,
}) => {
  return (
    <div className="mb-2">
      <ServerSection
        sectionType="channels"
        label="Voice Channels"
        channelType={ChannelType.AUDIO}
        role={role}
        server={server}
      />
      {audioChannels.map((channel) => (
        <ServerChannel
          key={channel.id}
          channel={channel}
          role={role}
          server={server}
        />
      ))}
    </div>
  );
};

export default VoiceChannelList;
