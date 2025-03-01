import { getServerByIdToChannels } from "@/entities/server/api";
import { getCurrentProfile } from "@/entities/user/api/userQuery";
import { redirect } from "next/navigation";

interface IServerIdPage {
  params: Promise<{
    serverId: string;
  }>;
}

export default async function ServerIdPage({ params }: IServerIdPage) {
  const profile = await getCurrentProfile();
  const { serverId } = await params;

  if (!profile) return redirect("/sign-in");

  const server = await getServerByIdToChannels({
    serverId: serverId,
    profileId: profile.id,
  });

  const initialChannel = server?.channels?.[0];

  if (initialChannel?.name !== "general") {
    return null;
  }

  return redirect(`/servers/${serverId}/channels/${initialChannel.id}`);
}
