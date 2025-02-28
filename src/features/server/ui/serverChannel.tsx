"use client";

import { IServer } from "@/entities";
import { IChannel } from "@/entities/channel/types/types";
import { cn } from "@/shared";
import { MemberRole } from "@prisma/client";
import { useParams } from "next/navigation";
import React, { FC } from "react";
import { iconMapParse } from "../libs/utils/iconsMap";
import TooltipAction from "@/shared/ui/tooltip/tooltipAction";
import { Edit, Lock, Trash } from "lucide-react";

interface IServerChannel {
  channel: IChannel;
  server: IServer;
  role: MemberRole;
}

const ServerChannel: FC<IServerChannel> = ({ channel, role }) => {
  const params = useParams();

  const Icon = iconMapParse[channel.type];

  return (
    <button
      className={cn(
        "group px-2 py-2 rounded-lg flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1",
        params?.channelId === channel.id && "bg-zinc-700/20 dark:bg-zinc-700"
      )}
    >
      <Icon className="flex-shrink-0 w-5 h-5 text-zinc-500 dark:text-zinc-400" />
      <p
        className={cn(
          "line-clamp-1 font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition-all",
          params?.channelId === channel.id &&
            "text-primary dark:text-zinc-200 dark:group-hover:text-white"
        )}
      >
        {channel.name}
      </p>
      {channel.name !== "general" && role !== MemberRole.GUEST && (
        <div className="ml-auto flex items-center gap-x-2">
          <TooltipAction side="top" label="edit">
            <Edit className="hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition-all" />
          </TooltipAction>
          <TooltipAction side="top" label="delete">
            <Trash className="hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition-all" />
          </TooltipAction>
        </div>
      )}
      {channel.name === "general" && (
        <Lock className="ml-auto w-4 h-4 text-zinc-500 dark:text-zinc-400" />
      )}
    </button>
  );
};

export default ServerChannel;
