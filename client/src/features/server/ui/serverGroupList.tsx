import React, { FC } from "react";
import { IChannelSearch } from "../types/types";
import ServerSearchGroupCard from "./serverSearchGroupCard";
import { cn } from "@/shared";
import { CommandGroup } from "@/shared/ui/command/command";

interface IServerGroupList {
  label: IChannelSearch["label"];
  items: IChannelSearch["data"];
  type: IChannelSearch["type"];
  handleNavigateToSelect: (params: {
    id: string;
    type: IChannelSearch["type"];
  }) => void;
}

const ServerGroupList: FC<IServerGroupList> = ({
  type,
  label,
  items,
  handleNavigateToSelect,
}) => {
  return (
    <CommandGroup
      key={label}
      heading={
        <span
          className={cn(
            "py-1 text-xs font-semibold uppercase tracking-wider rounded-md",
            "text-gray-600 ",
            "dark:text-indigo-400"
          )}
        >
          {label}
        </span>
      }
      className="py-2 px-2"
    >
      {items?.map((common) => (
        <ServerSearchGroupCard
          key={common.id}
          {...common}
          type={type}
          handleNavigateToSelect={handleNavigateToSelect}
        />
      ))}
    </CommandGroup>
  );
};

export default ServerGroupList;
