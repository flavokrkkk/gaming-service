"use client";

import { IServer } from "@/entities";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/shared";
import { MemberRole } from "@prisma/client";
import { ChevronDown } from "lucide-react";
import React, { FC } from "react";
import ServerActionsPanel from "./serverActionsPanel";
import clsx from "clsx";
import { useServerActions } from "../hooks/useServerActions";

interface IServerHeader {
  server: IServer;
  role: MemberRole;
}

const ServerHeader: FC<IServerHeader> = ({ role, server }) => {
  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;

  const {
    handleOpenEditModal,
    handleOpenInviteModal,
    handleOpenMembersModal,
    handleOpenLeaveServerModal,
    handleOpenDeleteServerModal,
    handleOpenCreateChannelModal,
  } = useServerActions(server);

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
          onDeleteServer={handleOpenDeleteServerModal}
          onCreateChannel={handleOpenCreateChannelModal}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ServerHeader;
