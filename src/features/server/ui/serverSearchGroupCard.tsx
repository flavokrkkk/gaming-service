import { CommandItem } from "@/shared/ui/command/command";
import React, { FC } from "react";
import { IChannelSearch } from "../types/types";
import { cn } from "@/shared";

interface IServerSearchGroupCard {
  id: string;
  type: IChannelSearch["type"];
  name: string;
  icon: React.ReactNode;
  handleNavigateToSelect: (params: {
    id: string;
    type: IChannelSearch["type"];
  }) => void;
}

const ServerSearchGroupCard: FC<IServerSearchGroupCard> = ({
  id,
  name,
  type,
  icon,
  handleNavigateToSelect,
}) => {
  const handleRoute = () => handleNavigateToSelect({ id, type });

  return (
    <CommandItem
      key={id}
      onSelect={handleRoute}
      className={cn(
        "flex items-center gap-3 px-4 py-2.5 text-zinc-200 rounded-lg cursor-pointer",
        "hover:bg-indigo-600/10 hover:text-white transition-all duration-200",
        " data-[selected=true]:text-white",
        "group relative overflow-hidden"
      )}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <span className="text-zinc-400 group-hover:text-indigo-300 transition-colors duration-200">
        {icon}
      </span>
      <span className="text-sm font-medium">{name}</span>
    </CommandItem>
  );
};

export default ServerSearchGroupCard;
