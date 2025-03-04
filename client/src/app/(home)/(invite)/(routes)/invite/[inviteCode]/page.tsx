import { getServerByInviteCode, setInviteMember } from "@/entities";
import { getCurrentProfile } from "@/entities/user/libs/userService";
import { ERouteNames } from "@/shared/libs/utils/pathVariables";
import { redirect } from "next/navigation";
import { FC } from "react";

interface IInviteCodePage {
  params: Promise<{
    inviteCode: string;
  }>;
}

const InviteCodePage: FC<IInviteCodePage> = async ({ params }) => {
  const { inviteCode } = await params;

  if (!inviteCode) return redirect("/");

  const profile = await getCurrentProfile();

  if (!profile) return redirect(ERouteNames.SIGN_IN);

  const existingServer = await getServerByInviteCode({
    inviteCode,
    profileId: profile.id,
  });

  if (existingServer) {
    return redirect(`${ERouteNames.SERVERS}/${existingServer.id}`);
  }

  const server = await setInviteMember({ inviteCode, profileId: profile.id });

  if (server) return redirect(`${ERouteNames.SERVERS}/${server.id}`);

  return null;
};

export default InviteCodePage;
