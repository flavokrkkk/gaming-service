import { IServer } from "@/entities";
import { IChannel } from "@/entities/channel/types/types";
import ServerChannel from "@/features/server/ui/serverChannel";
import ServerSection from "@/features/server/ui/serverSection";
import { ChannelType, MemberRole } from "@prisma/client";
import React, { FC } from "react";

interface ITextChannelList {
  textChannels: Array<IChannel>;
  server: IServer;
  role: MemberRole;
}

const TextChannelList: FC<ITextChannelList> = ({
  textChannels,
  role,
  server,
}) => {
  return (
    <div className="mb-2">
      <ServerSection
        sectionType="channels"
        label="Text Channels"
        channelType={ChannelType.TEXT}
        role={role}
        server={server}
      />
      {textChannels.map((channel) => (
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

export default TextChannelList;
