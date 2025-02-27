"use client";

import { IServer } from "@/entities";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/shared";
import { MemberRole } from "@prisma/client";
import { ChevronDown } from "lucide-react";
import React, { FC, useCallback } from "react";
import ServerActionsPanel from "./serverActionsPanel";
import clsx from "clsx";
import { useActions } from "@/shared/hooks/useActions";

interface IServerHeader {
  server: IServer;
  role: MemberRole;
}

const ServerHeader: FC<IServerHeader> = ({ role, server }) => {
  const { setIsOpen } = useActions();

  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;

  const handleOpenInviteModal = useCallback(
    () => setIsOpen({ type: "invite", data: { server } }),
    [server]
  );

  const handleOpenEditModal = useCallback(
    () => setIsOpen({ type: "editServer", data: { server } }),
    [server]
  );

  const handleOpenMembersModal = useCallback(
    () => setIsOpen({ type: "members", data: { server } }),
    [server]
  );

  const handleOpenCreateChannelModal = useCallback(
    () => setIsOpen({ type: "createChannel" }),
    [server]
  );
  const handleOpenLeaveServerModal = useCallback(
    () => setIsOpen({ type: "leaveServer", data: { server } }),
    [server]
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none" asChild>
        <button
          className={clsx(
            "w-full font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition",
            "data-[state=open]:[&>svg]:rotate-180"
          )}
        >
          {server.name}
          <ChevronDown className="h-5 w-5 ml-auto transition-transform duration-200" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]">
        <ServerActionsPanel
          isAdmin={isAdmin}
          isModerator={isModerator}
          onMembers={handleOpenMembersModal}
          onEditServer={handleOpenEditModal}
          onInvitePeople={handleOpenInviteModal}
          onLeaveServer={handleOpenLeaveServerModal}
          onCreateChannel={handleOpenCreateChannelModal}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ServerHeader;
