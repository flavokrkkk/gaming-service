import { getServerById } from "@/entities/server/api";
import { getCurrentProfile } from "@/entities/user/api/userQuery";
import ServerSideBar from "@/features/server/ui/serverSideBar";
import { redirect } from "next/navigation";
import React, { FC, PropsWithChildren } from "react";

const ServerIdLayout: FC<
  PropsWithChildren & { params: Promise<{ serverId: string }> }
> = async ({ children, params }) => {
  const { serverId } = await params;

  const profile = await getCurrentProfile();

  if (!profile) return redirect("/sign-in");

  const server = await getServerById({
    serverId,
    profileId: profile.id,
  });

  if (!server) return redirect("/");

  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-60 z-20 flex-col inset-y-0 fixed">
        <ServerSideBar serverId={server.id} />
      </div>
      <main className="h-full md:pl-60">{children}</main>
    </div>
  );
};

export default ServerIdLayout;
