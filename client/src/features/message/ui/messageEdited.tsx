import { cn } from "@/shared";
import React, { FC } from "react";

interface IMessageEdited {
  isEdited: boolean;
  isDeleted: boolean;
  content: string;
}

const MessageEdited: FC<IMessageEdited> = ({
  content,
  isDeleted,
  isEdited,
}) => (
  <p
    className={cn(
      "text-sm text-zinc-600 dark:text-zinc-300",
      isDeleted && "italic text-zinc-500 dark:text-zinc-400 text-xs mt-1"
    )}
  >
    {content}
    {isEdited && (
      <span className="text-[10px] mx-2 text-zinc-500 dark:text-zinc-400">
        (edited)
      </span>
    )}
  </p>
);

export default MessageEdited;
