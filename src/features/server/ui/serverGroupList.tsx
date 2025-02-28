import { CommandGroup } from "@/shared/ui/command/command";
import React, { FC } from "react";
import { IChannelSearch } from "../types/types";
import ServerSearchGroupCard from "./serverSearchGroupCard";

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
        <span className="py-1 flex flex-col space-y-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider">
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
