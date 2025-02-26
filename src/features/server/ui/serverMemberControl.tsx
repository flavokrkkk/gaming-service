import { IMember } from "@/entities/member/types/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/shared";
import { MemberRole } from "@prisma/client";
import {
  Check,
  Gavel,
  MoreVertical,
  Shield,
  ShieldCheck,
  ShieldQuestion,
} from "lucide-react";

import React, { FC } from "react";

interface IServerMemberControl {
  member: IMember;
  handleChageMember: (request: { memberId: string; role: MemberRole }) => void;
  handleDeleteMember: (request: { memberId: string }) => void;
}

const ServerMemberControl: FC<IServerMemberControl> = ({
  member,
  handleChageMember,
  handleDeleteMember,
}) => {
  const handleChangeRole = (event: React.MouseEvent<HTMLElement>) => {
    const value = event.currentTarget.dataset.value;
    if (!value) throw new Error("Invalid value!");
    if (member.role !== value) {
      handleChageMember({ memberId: member.id, role: value as MemberRole });
    }
  };

  const handleDelete = () => handleDeleteMember({ memberId: member.id });

  return (
    <div className="ml-auto">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="p-1.5 rounded-full bg-zinc-700/50 hover:bg-zinc-600 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <MoreVertical className="h-5 w-5 text-zinc-300" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="left"
          className="w-52 bg-zinc-800 border border-zinc-700 rounded-md shadow-xl p-1.5"
        >
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="flex items-center px-2 py-1.5 text-sm text-zinc-200 hover:bg-zinc-700 hover:text-white rounded-sm transition-colors cursor-pointer">
              <ShieldQuestion className="w-4 h-4 mr-2 text-indigo-400" />
              <span>Role</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="bg-zinc-800 border border-zinc-700 rounded-md shadow-lg p-1">
                <DropdownMenuItem
                  data-value={MemberRole.GUEST}
                  className="flex items-center x-2 py-1.5 text-sm text-zinc-200 hover:bg-indigo-600 hover:text-white rounded-sm transition-colors cursor-pointer"
                  onClick={handleChangeRole}
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Guest
                  {member.role === "GUEST" && (
                    <Check className="h-4 w-4 ml-auto text-indigo-200" />
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem
                  data-value={MemberRole.MODERATOR}
                  className="flex items-center px-2 py-1.5  text-sm text-zinc-200 hover:bg-indigo-600 hover:text-white rounded-sm transition-colors cursor-pointer"
                  onClick={handleChangeRole}
                >
                  <ShieldCheck className="h-4 w-4 mr-2" />
                  Moderator
                  {member.role === "MODERATOR" && (
                    <Check className="h-4 w-4 ml-auto text-indigo-200" />
                  )}
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSeparator className="my-1 border-t border-zinc-700" />
          <DropdownMenuItem
            className="flex items-center px-2 py-1.5 text-sm text-zinc-200 hover:bg-red-600 hover:text-white rounded-sm transition-colors cursor-pointer"
            onClick={handleDelete}
          >
            <Gavel className="h-4 w-4 mr-2" />
            Kick
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ServerMemberControl;
