import ServerMobileToggle from "@/features/server/ui/serverMobileToggle";
import SocketIndicator from "@/features/socket/ui/socketIndicator";
import UserAvatar from "@/features/user/ui/userAvatar";
import { Hash } from "lucide-react";
import React, { FC } from "react";

interface IChatHeader {
  serverId: string;
  name: string;
  type: "channel" | "conversation";
  imageUrl?: string;
}
const ChatHeader: FC<IChatHeader> = ({ name, serverId, imageUrl, type }) => {
  return (
    <div className="text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2">
      <ServerMobileToggle serverId={serverId} />
      {type === "channel" && (
        <Hash className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mr-2" />
      )}
      {type === "conversation" && (
        <UserAvatar src={imageUrl} className="h-8 w-8 md:h-6 md:w-6 mr-3" />
      )}
      <p className="font-semibold text-md text-black dark:text-white">{name}</p>
      <div className="ml-auto flex items-center">
        <SocketIndicator />
      </div>
    </div>
  );
};

export default ChatHeader;
