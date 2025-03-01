import { getChannelById } from "@/entities/channel/api/channelQuery";
import { getChannelMembers } from "@/entities/member/api/memberQuery";
import { getCurrentProfile } from "@/entities/user/api/userQuery";
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
      ChannelId
    </div>
  );
};

export default ChannelId;
