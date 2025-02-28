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
          "relative bg-zinc-900  rounded-xl shadow-2xl border border-zinc-800/50",
          " w-full mx-auto overflow-hidden animate-slide-up",
          "ring-1 ring-indigo-500/20"
        )}
      >
        <CommandInput
          placeholder="Search channels, members..."
          className={cn(
            "bg-transparent border-zinc-700/50 text-zinc-100 placeholder:text-zinc-500/70",
            "focus:ring-0  transition-all duration-300",
            "py-3 text-sm font-medium"
          )}
        />
        <CommandList className="py-2 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-500/50 scrollbar-track-zinc-900/50">
          <CommandEmpty className="py-6 text-center text-zinc-400 text-sm italic">
            No results found...
          </CommandEmpty>
          {children}
        </CommandList>
      </div>
    </CommandDialog>
  );
};

export default CustomCommand;
