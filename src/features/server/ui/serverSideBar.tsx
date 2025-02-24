import { getServerChannel } from "@/entities/server/api";
import { getCurrentProfile } from "@/entities/user/api/userQuery";
import { redirect } from "next/navigation";
import { FC } from "react";
import ServerHeader from "./serverHeader";

interface IServerSideBar {
  serverId: string;
}

const ServerSideBar: FC<IServerSideBar> = async ({ serverId }) => {
  const profile = await getCurrentProfile();

  if (!profile) return redirect("/");

  const server = await getServerChannel({ serverId });

  //   const filterChannels = filterChannelByType(server);

  //   const members = server.members?.filter((member) => member.id !== profile.id);

  if (!server) return redirect("/");

  const role = server.members?.find(
    (member) => member.profileId === profile.id
  )?.role;

  if (!role) return redirect("/");

  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
      <ServerHeader server={server} role={role} />
    </div>
  );
};

export default ServerSideBar;
