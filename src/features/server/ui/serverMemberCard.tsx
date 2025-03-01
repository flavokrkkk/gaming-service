import { IMember } from "@/entities/member/types/types";
import React, { FC, PropsWithChildren } from "react";
import { roleIconMap } from "../libs/utils";
import UserAvatar from "@/features/user/ui/userAvatar";

interface IServerMemberCard {
  member: IMember;
}
const ServerMemberCard: FC<IServerMemberCard & PropsWithChildren> = ({
  children,
  member: {
    id,
    role,
    profile: { imageUrl, email, username },
  },
}) => {
  return (
    <div
      key={id}
      className="flex items-center gap-x-3 py-3 px-4 mb-3 bg-zinc-800/70 rounded-lg cursor-pointer hover:bg-zinc-700/70 transition-all duration-200 hover:shadow-md"
    >
      <UserAvatar
        src={imageUrl}
        className="w-10 h-10  transition-transform duration-150 hover:scale-105"
      />

      <div className="flex flex-col gap-y-0.5 flex-1">
        <div className="flex items-center gap-x-2">
          <span className="text-sm font-semibold text-white tracking-wide">
            {username}
          </span>
          {roleIconMap[role] && (
            <span className="text-indigo-400">{roleIconMap[role]}</span>
          )}
        </div>
        <p className="text-xs text-zinc-400 truncate">{email}</p>
      </div>
      {children}
    </div>
  );
};

export default ServerMemberCard;
