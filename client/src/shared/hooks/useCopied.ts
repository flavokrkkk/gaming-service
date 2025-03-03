"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";

export const useCopied = () => {
  const [isCopied, setIsCopied] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleCopyClick = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    startTransition(async () => {
      try {
        const textToCopy = event.currentTarget.value;
        if (!textToCopy) throw new Error("Is empty copy value!");

        await navigator.clipboard.writeText(textToCopy);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
        toast.error("Скопировано", {
          position: "bottom-right",
        });
      } catch (err) {
        toast.error(`Не удалось скопировать ${err}`, {
          position: "bottom-right",
        });
        console.error("Ошибка при копировании текста:", err);
        setIsCopied(false);
      }
    });
  };

  return {
    isCopied,
    isPending,
    handleCopyClick,
  };
};
