import { useEffect, useState } from "react";

export function useKeyPress(targetKey: Array<string>) {
  const [isKeyPressed, setIsKeyPressed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (targetKey.includes(event.key)) {
        setIsKeyPressed(true);
        event.preventDefault();
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (targetKey.includes(event.key)) {
        setIsKeyPressed(false);
        event.preventDefault();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [targetKey]);

  return isKeyPressed;
}
