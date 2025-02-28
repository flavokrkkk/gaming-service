"use client";

import { FC, useCallback, useState } from "react";
import { IChannelSearch } from "../types/types";
import { SearchIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import ServerGroupList from "./serverGroupList";
import CustomCommand from "@/features/command/ui/customCommand";

interface IServerSearch {
  data: Array<IChannelSearch>;
}

const ServerSearch: FC<IServerSearch> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const params = useParams();

  const toggleCommand = () => setIsOpen((prev) => !prev);

  const handleNavigateToSelect = useCallback(
    ({ id, type }: { id: string; type: IChannelSearch["type"] }) => {
      toggleCommand();

      if (type === "member") {
        return router.push(`/servers/${params?.serverId}/conversations/${id}`);
      }

      if (type === "channel") {
        return router.push(`/servers/${params?.serverId}/channels/${id}`);
      }
    },
    [params?.serverId, router]
  );

  return (
    <>
      <button
        className="group px-2 py-2 rounded-lg flex items-center gap-x-2 w-full hover:bg-z/10 dark:hover:bg-zinc-700/50 transition-all"
        onClick={toggleCommand}
      >
        <SearchIcon className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
        <p className="font-semibold text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-all">
          Search
        </p>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto">
          <span className="text-xs ">⌘</span>K
        </kbd>
      </button>
      <CustomCommand
        isOpen={isOpen}
        title="Search Channels and Members"
        setIsOpen={setIsOpen}
      >
        {data.map(({ data: items, label, type }) => {
          if (!items?.length) return null;

          return (
            <ServerGroupList
              key={label}
              type={type}
              items={items}
              label={label}
              handleNavigateToSelect={handleNavigateToSelect}
            />
          );
        })}
      </CustomCommand>
    </>
  );
};

export default ServerSearch;
