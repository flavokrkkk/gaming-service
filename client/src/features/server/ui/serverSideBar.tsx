import { redirect } from "next/navigation";
import { FC } from "react";
import ServerHeader from "./serverHeader";
import { ScrollArea } from "@/shared/ui/scrollArea";
import ServerSearch from "./serverSearch";
import { filterChannelByType } from "@/shared/helpers/filterChannels";
import { Separator } from "@/shared/ui/separator";
import TextChannelList from "@/features/channel/ui/textChannelLIst";
import VideoChannelList from "@/features/channel/ui/videoChannelList";
import VoiceChannelList from "@/features/channel/ui/voiceChannelList";
import MembersList from "@/features/members/ui/membersList";
import { getServerChannel } from "@/entities";
import { getCurrentProfile } from "@/entities/user/libs/userService";

interface IServerSideBar {
  serverId: string;
}

const ServerSideBar: FC<IServerSideBar> = async ({ serverId }) => {
  const profile = await getCurrentProfile();

  if (!profile) {
    return redirect("/sign-in");
  }

  const server = await getServerChannel({ serverId });
  if (!server) {
    return redirect("/");
  }

  const { types, channels, members } = filterChannelByType(server, profile.id);

  const role = server.members?.find(
    (member) => member.profileId === profile.id
  )?.role;

  if (!role) return redirect("/");

  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
      <ServerHeader server={server} role={role} />
      <ScrollArea className="flex-1 px-3">
        <div className="mt-2">
          <ServerSearch data={types} />
        </div>
        <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2" />
        {!!channels?.textChannels.length && (
          <TextChannelList
            role={role}
            server={server}
            textChannels={channels.textChannels}
          />
        )}
        {!!channels?.audioChannels.length && (
          <VoiceChannelList
            role={role}
            server={server}
            audioChannels={channels.audioChannels}
          />
        )}

        {!!channels?.videoChannels.length && (
          <VideoChannelList
            role={role}
            server={server}
            videoChannels={channels.videoChannels}
          />
        )}

        {!!members?.length && (
          <MembersList role={role} server={server} members={members} />
        )}
      </ScrollArea>
    </div>
  );
};

export default ServerSideBar;
