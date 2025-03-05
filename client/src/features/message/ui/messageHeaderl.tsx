import { IMember } from "@/entities/member/types/types";
import { roleIconMap } from "@/features/server/libs/utils";
import TooltipAction from "@/shared/ui/tooltip/tooltipAction";
import React, { FC } from "react";

interface IMessageHeader {
  member: IMember;
  timestamp: string;
}

const MessageHeader: FC<IMessageHeader> = ({ member, timestamp }) => (
  <div className="flex items-center gap-x-2">
    <div className="flex items-center space-x-2">
      <p className="font-semibold text-sm hover:underline cursor-pointer">
        {member.profile.username}
      </p>
      <TooltipAction label={member.role} side="top">
        {roleIconMap[member.role]}
      </TooltipAction>
    </div>
    <span className="text-xs text-zinc-500 dark:text-zinc-400">
      {timestamp}
    </span>
  </div>
);

export default MessageHeader;
