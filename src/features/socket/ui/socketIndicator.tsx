"use client";

import { socketSelectors } from "@/entities/socket/model/store/socketSlice";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { Badge } from "@/shared/ui/badge/badge";
import React from "react";

const SocketIndicator = () => {
  const isConnected = useAppSelector(socketSelectors.isConnected);

  if (!isConnected) {
    return (
      <Badge
        variant={"outline"}
        className="bg-yellow-600 text-white border-none"
      >
        Fallback: Polling every 1s
      </Badge>
    );
  }

  return (
    <Badge
      variant={"outline"}
      className="bg-emerald-600 text-white border-none"
    >
      Live: Real-time updates
    </Badge>
  );
};

export default SocketIndicator;
