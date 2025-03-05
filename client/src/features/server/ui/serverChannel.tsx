"use client";

import { IServer } from "@/entities";
import { IChannel } from "@/entities/channel/types/types";
import { cn } from "@/shared";
import { MemberRole } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import React, { FC } from "react";
import { iconMapParse } from "../libs/utils/iconsMap";
import TooltipAction from "@/shared/ui/tooltip/tooltipAction";
import { Edit, Lock, Trash } from "lucide-react";
import { useActions } from "@/shared/hooks/useActions";

interface IServerChannel {
  channel: IChannel;
  server: IServer;
  role: MemberRole;
}

const ServerChannel: FC<IServerChannel> = ({ server, channel, role }) => {
  const params = useParams();
  const router = useRouter();

  const { setIsOpen } = useActions();

  const Icon = iconMapParse[channel.type];

  const hasAccess =
    !channel.isPrivate ||
    role === MemberRole.ADMIN ||
    role === MemberRole.MODERATOR;

  const handleDeleteChannnel = (event: React.MouseEvent<SVGSVGElement>) => {
    event.stopPropagation();
    setIsOpen({ type: "deleteChannel", data: { server, channel } });
  };

  const handleEditChannnel = (event: React.MouseEvent<SVGSVGElement>) => {
    event.stopPropagation();
    setIsOpen({ type: "editChannel", data: { server, channel } });
  };

  const handleNavigation = () => {
    if (params?.channelId !== channel.id) {
      router.push(`/servers/${params?.serverId}/channels/${channel.id}`);
    }
  };

  if (!hasAccess) {
    return null;
    //  (
    //   <div
    //     className={cn(
    //       "group px-2 py-2 rounded-lg flex items-center gap-x-2 w-full bg-zinc-700/10 dark:bg-zinc-800/50 opacity-50 cursor-not-allowed mb-1"
    //     )}
    //   >
    //     <Lock className="flex-shrink-0 w-5 h-5 text-zinc-500 dark:text-zinc-400" />
    //     <p className="line-clamp-1 font-semibold text-sm text-zinc-500 dark:text-zinc-400">
    //       {channel.name}
    //     </p>
    //   </div>
    // );
  }

  return (
    <button
      className={cn(
        "group px-2 py-2 rounded-lg flex disabled:cursor-pointer items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1",
        params?.channelId === channel.id && "bg-zinc-700/20 dark:bg-zinc-700"
      )}
      onClick={handleNavigation}
    >
      <Icon className="flex-shrink-0 w-5 h-5 text-zinc-500 dark:text-zinc-400" />
      <p
        className={cn(
          "line-clamp-1 font-medium text-[15px] text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition-all",
          params?.channelId === channel.id &&
            "text-primary dark:text-zinc-200 dark:group-hover:text-white"
        )}
      >
        {channel.name}
      </p>
      {channel.name !== "general" && role !== MemberRole.GUEST && (
        <div className="ml-auto flex items-center gap-x-2">
          <TooltipAction side="top" label="edit">
            <Edit
              className="hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition-all"
              onClick={handleEditChannnel}
            />
          </TooltipAction>
          <TooltipAction side="top" label="delete">
            <Trash
              className="hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition-all"
              onClick={handleDeleteChannnel}
            />
          </TooltipAction>
          {channel.isPrivate && (
            <TooltipAction side="top" label="delete">
              <Lock className="ml-auto w-3 h-3  group-hover:hidden text-indigo-600 dark:text-indigo-500" />
            </TooltipAction>
          )}
        </div>
      )}

      {channel.name === "general" && !channel.isPrivate && (
        <Lock className="ml-auto w-4 h-4 text-zinc-500 dark:text-zinc-400" />
      )}
    </button>
  );
};

export default ServerChannel;
