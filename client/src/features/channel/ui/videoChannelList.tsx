import { IServer } from "@/entities";
import { IChannel } from "@/entities/channel/types/types";
import ServerChannel from "@/features/server/ui/serverChannel";
import ServerSection from "@/features/server/ui/serverSection";
import { ChannelType, MemberRole } from "@prisma/client";
import React, { FC } from "react";

interface IVideoChannelList {
  videoChannels: Array<IChannel>;
  server: IServer;
  role: MemberRole;
}

const VideoChannelList: FC<IVideoChannelList> = ({
  videoChannels,
  role,
  server,
}) => {
  return (
    <div className="mb-2">
      <ServerSection
        sectionType="channels"
        label="Video Channels"
        channelType={ChannelType.VIDEO}
        role={role}
        server={server}
      />
      {videoChannels.map((channel) => (
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

export default VideoChannelList;
