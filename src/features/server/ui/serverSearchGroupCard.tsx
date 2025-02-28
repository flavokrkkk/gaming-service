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
        "flex items-center gap-3 px-4 py-2.5 rounded-lg cursor-pointer transition-all duration-200",
        "text-gray-800 hover:bg-indigo-100 hover:text-indigo-700",
        "dark:text-zinc-200 dark:hover:text-white",
        "data-[selected=true]:bg-indigo-200 data-[selected=true]:text-indigo-800",
        "dark:data-[selected=true]:bg-indigo-400/20 dark:data-[selected=true]:text-white"
      )}
    >
      <span
        className={cn(
          "text-gray-500 group-hover:text-indigo-600 transition-colors duration-200",
          "dark:text-zinc-400 dark:group-hover:text-indigo-300"
        )}
      >
        {icon}
      </span>
      <span className="text-sm font-medium">{name}</span>
    </CommandItem>
  );
};

export default ServerSearchGroupCard;
