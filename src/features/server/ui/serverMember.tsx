"use client";

import { IServer } from "@/entities";
import { IMember } from "@/entities/member/types/types";
import { useParams } from "next/navigation";
import React, { FC } from "react";
import { roleIconMap } from "../libs/utils";
import { cn } from "@/shared";
import UserAvatar from "@/features/user/ui/userAvatar";

interface IServerMember {
  member: IMember;
  server: IServer;
}

const ServerMember: FC<IServerMember> = ({ member }) => {
  const params = useParams();

  return (
    <button
      className={cn(
        "group: px-2 py-2 rounded-lg flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition-all mb-1",
        params?.memberId === member.id && "bg-zinc-700/20 dark:bg-zinc-700"
      )}
    >
      <UserAvatar
        src={member.profile.imageUrl}
        className="h-8 w-8 md:h-8 md:w-8"
      />
      <p
        className={cn(
          "font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 data:text-zinc-400 dark:group-hover:text-zinc-300 transition-all",

          params?.channelId === member.id &&
            "text-primary dark:text-zinc-200 dark:group-hover:text-white"
        )}
      >
        {member.profile.name}
      </p>
      {roleIconMap[member.role]}
    </button>
  );
};

export default ServerMember;
