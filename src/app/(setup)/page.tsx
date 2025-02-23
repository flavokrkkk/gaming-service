import { getCurrentUser, getServerByProfile } from "@/entities";
import ServerCustomizeModal from "@/features/server/ui/serverCustomizeModal";
import { ERouteNames } from "@/shared/libs/utils/pathVariables";
import { redirect } from "next/navigation";
import React from "react";

const SetupPage = async () => {
  const profile = await getCurrentUser();

  const server = await getServerByProfile({ profileId: profile.id });

  if (server) {
    return redirect(`${ERouteNames.SERVERS}/${server.id}`);
  }

  return <ServerCustomizeModal />;
};

export default SetupPage;
