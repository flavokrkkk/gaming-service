"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/ui/popover/popover";
import { Smile } from "lucide-react";
import { FC } from "react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { useTheme } from "next-themes";

interface IEmojiPicker {
  onChange: (value: string) => void;
}
const EmojiPicker: FC<IEmojiPicker> = ({ onChange }) => {
  const { resolvedTheme } = useTheme();

  const handleChangeEmoji = (emoji: { native: string }) =>
    onChange(emoji.native);

  return (
    <Popover>
      <PopoverTrigger>
        <Smile className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-all" />
      </PopoverTrigger>
      <PopoverContent
        side="right"
        sideOffset={40}
        className="bg-transparent border-none shadow-none drop-shadow-none mb-16"
      >
        <Picker
          data={data}
          theme={resolvedTheme}
          onEmojiSelect={handleChangeEmoji}
          previewPosition="none"
        />
      </PopoverContent>
    </Popover>
  );
};

export default EmojiPicker;
