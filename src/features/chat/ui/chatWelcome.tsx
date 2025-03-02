import { cn } from "@/shared";
import { MemberRole } from "@prisma/client";
import { Hash, Settings } from "lucide-react";
import React, { FC } from "react";

interface IChatWelcome {
  type: "channel" | "conversation";
  name: string;
  role?: MemberRole;
}

const ChatWelcome: FC<IChatWelcome> = ({ name, type, role }) => {
  return (
    <div className="space-y-2 px-4 mb-4 mt-6">
      {type === "channel" && (
        <div className="h-[75px] w-[75px] rounded-full bg-zinc-500 dark:bg-zinc-700 flex items-center justify-center">
          <Hash className="h-12 w-12 text-white" />
        </div>
      )}
      <p className="text-xl md:text-3xl font-bold">
        {type === "channel" && "Welcome to #"}
        {name}
      </p>
      <p className="text-zinc-600 dark:text-zinc-400 text-sm font-semibold">
        {type === "channel"
          ? `This is the start of the #${name} channel.`
          : `This is the start og your conversation with ${name}`}
      </p>
      {type === "channel" && (role === "ADMIN" || role === "MODERATOR") && (
        <div
          className={cn(
            "flex items-center cursor-pointer gap-2 p-2 rounded-md bg-zinc-100 dark:bg-zinc-800/50 transition-colors",
            "hover:bg-zinc-200/70 dark:hover:bg-zinc-700/70"
          )}
        >
          <Settings className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
          <p className="text-sm font-semibold text-indigo-500 dark:text-indigo-400">
            Вы можете настроить канал
          </p>
        </div>
      )}
    </div>
  );
};

export default ChatWelcome;
