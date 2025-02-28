import { cn, DialogTitle } from "@/shared";
import { useKeyPress } from "@/shared/hooks/useKeyPress";
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandList,
} from "@/shared/ui/command/command";
import React, {
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useEffect,
} from "react";

interface ICustomCommand {
  isOpen: boolean;
  title: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const CustomCommand: FC<ICustomCommand & PropsWithChildren> = ({
  isOpen,
  children,
  title,
  setIsOpen,
}) => {
  const isKeyboard = useKeyPress(["Control", "k"]);

  useEffect(() => {
    if (isKeyboard) {
      setIsOpen(true);
    }
  }, [isKeyboard]);

  return (
    <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTitle className="sr-only">{title}</DialogTitle>
      <div
        className={cn(
          "relative rounded-xl shadow-2xl border w-full mx-auto overflow-hidden",
          "bg-white border-gray-200 ring-1 ring-indigo-300/20",
          "dark:bg-zinc-900 dark:border-zinc-800/50 dark:ring-1 dark:ring-indigo-500/20"
        )}
      >
        <CommandInput
          placeholder="Search channels, members..."
          className={cn(
            "bg-transparent text-sm font-medium py-3 transition-all duration-300 focus:ring-0",
            "text-gray-900  placeholder:text-gray-400 ",
            "dark:text-zinc-100 dark:border-zinc-700/50 dark:placeholder:text-zinc-500/70 dark:focus:border-indigo-500/70"
          )}
        />
        <CommandList
          className={cn(
            "py-2 overflow-y-auto scrollbar-thin max-h-[320px]",
            "scrollbar-thumb-gray-400/50 scrollbar-track-gray-100",
            "dark:scrollbar-thumb-indigo-500/50 dark:scrollbar-track-zinc-900/50"
          )}
        >
          <CommandEmpty
            className={cn(
              "py-6 text-center text-sm italic",
              "text-gray-500",
              "dark:text-zinc-400"
            )}
          >
            No results found...
          </CommandEmpty>
          {children}
        </CommandList>
      </div>
    </CommandDialog>
  );
};

export default CustomCommand;
