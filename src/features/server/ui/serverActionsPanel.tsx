import { FC } from "react";
import { DropdownMenuItem, DropdownMenuSeparator } from "@/shared";
import {
  LogOut,
  PlusCircle,
  Settings,
  Trash,
  UserPlus,
  Users,
} from "lucide-react";

interface IServerActionsPanel {
  isModerator: boolean;
  isAdmin: boolean;
}

const ServerActionsPanel: FC<IServerActionsPanel> = ({
  isAdmin,
  isModerator,
}) => {
  return (
    <>
      {isModerator && (
        <DropdownMenuItem className="text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer">
          Invite People
          <UserPlus className="h-4 w-4 ml-auto" />
        </DropdownMenuItem>
      )}

      {isAdmin && (
        <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer">
          Server Settings
          <Settings className="h-4 w-4 ml-auto" />
        </DropdownMenuItem>
      )}

      {isAdmin && (
        <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer">
          Manage Members
          <Users className="h-4 w-4 ml-auto" />
        </DropdownMenuItem>
      )}
      {isModerator && (
        <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer">
          Create Channel
          <PlusCircle className="h-4 w-4 ml-auto" />
        </DropdownMenuItem>
      )}
      {isModerator && <DropdownMenuSeparator />}
      {isAdmin && (
        <DropdownMenuItem className="text-rose-500 px-3 py-2 text-sm cursor-pointer">
          Delete Server
          <Trash className="h-4 w-4 ml-auto" />
        </DropdownMenuItem>
      )}
      {!isAdmin && (
        <DropdownMenuItem className="text-rose-500 px-3 py-2 text-sm cursor-pointer">
          Leave Server
          <LogOut className="h-4 w-4 ml-auto" />
        </DropdownMenuItem>
      )}
    </>
  );
};

export default ServerActionsPanel;
