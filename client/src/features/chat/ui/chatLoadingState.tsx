"use client";

import { Skeleton } from "@/shared/ui/skeleton/skeleton";
import React, { FC } from "react";

interface IChatLoadingState {
  isFullChat?: boolean;
  messageCount?: number;
}

const ChatLoadingState: FC<IChatLoadingState> = ({
  isFullChat,
  messageCount = 12,
}) => {
  console.log(typeof window !== "undefined" && window.outerHeight);
  return (
    <div className="flex flex-col flex-1 h-full overflow-hidden">
      {isFullChat && (
        <div className="px-3 flex items-center h-[47px] border-neutral-200 dark:border-neutral-800 border-b-2">
          <Skeleton className="h-6 w-6 rounded bg-zinc-200 dark:bg-zinc-700 mr-2" />
          <Skeleton className="h-5 w-32 bg-zinc-200 dark:bg-zinc-700" />
          <div className="flex-1" />
          <Skeleton className="h-4 w-20 bg-zinc-200 dark:bg-zinc-700" />
        </div>
      )}

      <div className="flex flex-col flex-1 p-4 mt-6 space-y-6 overflow-y-auto">
        {Array.from({ length: messageCount }).map((_, index) => (
          <div key={index} className="flex items-start space-x-3">
            <Skeleton className="h-10 w-10 rounded-full bg-zinc-200 dark:bg-zinc-700" />
            <div className="flex-1 space-y-2">
              <div className="flex items-center space-x-2">
                <Skeleton className="h-4 w-24 bg-zinc-200 dark:bg-zinc-700" />
                <Skeleton className="h-3 w-16 bg-zinc-200 dark:bg-zinc-700" />
              </div>
              <Skeleton className="h-4 w-[80%] bg-zinc-200 dark:bg-zinc-700" />
              {index % 2 === 0 && (
                <Skeleton className="h-4 w-[60%] bg-zinc-200 dark:bg-zinc-700" />
              )}
            </div>
          </div>
        ))}
      </div>
      {isFullChat && (
        <div className="p-4 pb-6 border-zinc-200 dark:border-zinc-700">
          <Skeleton className="h-12 w-full mx-auto rounded-lg bg-zinc-200 dark:bg-zinc-700" />
        </div>
      )}
    </div>
  );
};

export default ChatLoadingState;
