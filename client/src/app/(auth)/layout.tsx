import React, { PropsWithChildren } from "react";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="h-full flex items-center justify-center w-full">
      {children}
    </div>
  );
}
