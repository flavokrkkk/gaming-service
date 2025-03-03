"use client";

import { IServer } from "@/entities";
import { Label } from "@/shared";
import { useActions } from "@/shared/hooks/useActions";
import TooltipAction from "@/shared/ui/tooltip/tooltipAction";
import { ChannelType, MemberRole } from "@prisma/client";
import { Plus, Settings } from "lucide-react";
import React, { FC } from "react";

interface IServerSection {
  label: string;
  role?: string;
  sectionType?: "channels" | "members";
  channelType?: ChannelType;
  server: IServer;
}

const ServerSection: FC<IServerSection> = ({
  label,
  server,
  role,
  channelType,
  sectionType,
}) => {
  const { setIsOpen } = useActions();

  const handleOpenCreateChannel = () => {
    setIsOpen({
      type: "createChannel",
      data: { server, channelType: channelType },
    });
  };
  const handleOpenMembers = () =>
    setIsOpen({ type: "members", data: { server } });

  return (
    <div className="flex items-center justify-between py-2">
      <Label className="text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400">
        {label}
      </Label>
      {role !== MemberRole.GUEST && sectionType === "channels" && (
        <TooltipAction label="Create Channel" side="top">
          <button
            className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
            onClick={handleOpenCreateChannel}
          >
            <Plus className="h-4 w-4" />
          </button>
        </TooltipAction>
      )}

      {role === MemberRole.ADMIN && sectionType === "members" && (
        <TooltipAction label="Manage Members" side="top">
          <button
            className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
            onClick={handleOpenMembers}
          >
            <Settings className="h-4 w-4" />
          </button>
        </TooltipAction>
      )}
    </div>
  );
};

export default ServerSection;
