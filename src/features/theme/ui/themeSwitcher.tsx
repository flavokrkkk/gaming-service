"use client";

import { useTheme } from "next-themes";
import { themesIcon, themesInversion } from "../libs/constants";
import { Avatar } from "@/shared";
const ThemeSwitcher = () => {
  const { setTheme, theme } = useTheme();

  const handleChangeTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!event.currentTarget.value) throw new Error("Invalid theme!");

    setTheme(
      themesInversion[event.currentTarget.value as keyof typeof themesInversion]
    );
  };

  return (
    <button
      aria-label="Change theme"
      className="flex justify-center items-center gap-2 p-2 rounded-full transition-all duration-300 hover:scale-110 "
      value={theme}
      onClick={handleChangeTheme}
    >
      <Avatar
        className={
          "text-black/80 dark:text-white/80 transition-transform duration-200 ease-in-out transform hover:scale-125 p-1"
        }
      >
        {themesIcon[theme as keyof typeof themesIcon]}
      </Avatar>
    </button>
  );
};

export default ThemeSwitcher;
