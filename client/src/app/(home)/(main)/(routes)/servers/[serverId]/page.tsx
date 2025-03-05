import { getServerByIdToChannels } from "@/entities";
import { getCurrentProfile } from "@/entities/user/libs/userService";
import ClientServerPage from "@/features/server/ui/serverSuspense";
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

  if (!server) return redirect("/");

  const initialChannel = server?.channels?.[0];

  if (initialChannel?.name !== "general") {
    return null;
  }

  return <ClientServerPage server={server} serverId={serverId} />;
}
