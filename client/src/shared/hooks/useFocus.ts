import { useRef } from "react";

export function useFocus() {
  const elementRef = useRef<HTMLInputElement | null>(null);

  const setFocus = () => {
    if (elementRef.current) {
      elementRef.current.focus();
    }
  };

  return {
    elementRef,
    setFocus,
  };
}
