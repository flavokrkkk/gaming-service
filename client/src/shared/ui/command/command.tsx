"use client";

import * as React from "react";
import { type DialogProps } from "@radix-ui/react-dialog";
import { Search } from "lucide-react";
import {
  CommandList as CommandPrimitiveList,
  CommandInput as CommandInputPrimitive,
  CommandItem as CommandItemPrimitive,
  CommandGroup as CommandGroupPrimitive,
  CommandEmpty as CommandEmptyPrimitive,
  Command as CommandPrimitive,
} from "cmdk";

import { cn } from "@/shared/libs";
import { Dialog, DialogContent } from "../dialog";

interface CommandProps {
  label?: string;
  shouldFilter?: boolean;
  filter?: (value: string, search: string) => number;
  value?: string;
  onValueChange?: (value: string) => void;
  loop?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const Command = React.forwardRef<HTMLDivElement, CommandProps>(
  ({ className, children, ...props }, ref) => {
    const Component = CommandPrimitive as unknown as React.FC<
      CommandProps & { ref?: React.Ref<HTMLDivElement> }
    >;

    return (
      <Component
        ref={ref}
        className={cn(
          "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
Command.displayName = CommandPrimitive.displayName;

const CommandDialog = ({ children, ...props }: DialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0 shadow-lg">
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
};

interface CommandInputProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const CommandInput = React.forwardRef<HTMLInputElement, CommandInputProps>(
  ({ className, ...props }, ref) => {
    const Component = CommandInputPrimitive as unknown as React.FC<
      CommandInputProps & { ref?: React.Ref<HTMLDivElement> }
    >;

    return (
      <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
        <Component
          ref={ref}
          className={cn(
            "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);
CommandInput.displayName = CommandInputPrimitive.displayName;

interface CommandListProps {
  className?: string;
  children?: React.ReactNode;
}

const CommandList = React.forwardRef<HTMLDivElement, CommandListProps>(
  ({ className, children, ...props }, ref) => {
    const Component = CommandPrimitiveList as unknown as React.FC<
      CommandListProps & { ref?: React.Ref<HTMLDivElement> }
    >;
    return (
      <Component
        ref={ref}
        className={cn(
          "max-h-[300px] overflow-y-auto overflow-x-hidden",
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
CommandList.displayName = CommandPrimitiveList.displayName;

interface CommandEmptyProps {
  className?: string;
  children?: React.ReactNode;
}

const CommandEmpty = React.forwardRef<HTMLDivElement, CommandEmptyProps>(
  (props, ref) => {
    const Component = CommandEmptyPrimitive as unknown as React.FC<
      CommandListProps & { ref?: React.Ref<HTMLDivElement> }
    >;
    return (
      <Component ref={ref} className="py-6 text-center text-sm" {...props} />
    );
  }
);

CommandEmpty.displayName = CommandEmptyPrimitive.displayName;

interface CommandGroupProps {
  className?: string;
  children?: React.ReactNode;
  heading?: JSX.Element;
}
const CommandGroup = React.forwardRef<HTMLDivElement, CommandGroupProps>(
  ({ className, ...props }, ref) => {
    const Component = CommandGroupPrimitive as unknown as React.FC<
      CommandListProps & { ref?: React.Ref<HTMLDivElement> }
    >;

    return (
      <Component
        ref={ref}
        className={cn(
          "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
          className
        )}
        {...props}
      />
    );
  }
);
CommandGroup.displayName = CommandGroupPrimitive.displayName;
interface CommandItemProps {
  className?: string;
  children?: React.ReactNode;
  onSelect?: () => void;
  heading?: JSX.Element;
}

const CommandItem = React.forwardRef<HTMLDivElement, CommandItemProps>(
  ({ className, ...props }, ref) => {
    const Component = CommandItemPrimitive as unknown as React.FC<
      CommandItemProps & { ref?: React.Ref<HTMLDivElement> }
    >;
    return (
      <Component
        ref={ref}
        className={cn(
          "relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
          className
        )}
        {...props}
      />
    );
  }
);

CommandItem.displayName = CommandItemPrimitive.displayName;

export {
  Command,
  CommandDialog,
  CommandItem,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
};
