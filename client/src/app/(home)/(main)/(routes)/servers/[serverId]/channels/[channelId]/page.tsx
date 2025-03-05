import { getChannelById } from "@/entities/channel/libs/channelService";
import { getChannelMembers } from "@/entities/member/libs/memberService";
import { getCurrentProfile } from "@/entities/user/libs/userService";
import ChatHeader from "@/features/chat/ui/chatHeader";
import ChatInput from "@/features/chat/ui/chatInput";
import { ChatMessages } from "@/features/chat/ui/chatMessages";
import { redirect } from "next/navigation";
import React, { FC } from "react";

interface IChannelIdPageProps {
  params: Promise<{
    serverId: string;
    channelId: string;
  }>;
}

const ChannelId: FC<IChannelIdPageProps> = async ({ params }) => {
  const profile = await getCurrentProfile();
  if (!profile) return redirect("/sign-in");

  const { serverId, channelId } = await params;

  const channel = await getChannelById({ channelId });
  const member = await getChannelMembers({ serverId, profileId: profile.id });
  if (!channel || !member) return redirect("/");

  return (
    <div className="bg-white dark:bg-gray-mode-200 flex flex-col h-full">
      <ChatHeader name={channel.name} type="channel" serverId={serverId} />
      <ChatMessages
        member={member}
        name={channel.name}
        type="channel"
        socketQuery={{
          channelId: channel.id,
          serverId: channel.serverId,
        }}
        chatId={channel.id}
        paramKey="channelId"
        paramValue={channel.id}
      />
      <ChatInput
        name={channel.name}
        type="channel"
        apiUrl="/api/socket/messages"
        query={{
          channelId: channel.id,
          serverId: channel.serverId,
        }}
      />
    </div>
  );
};

export default ChannelId;
