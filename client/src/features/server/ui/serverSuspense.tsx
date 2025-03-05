"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ChatLoadingState from "@/features/chat/ui/chatLoadingState";
import { IServer } from "@/entities";

interface ClientServerPageProps {
  server: IServer;
  serverId: string;
}

const ClientServerPage = ({ server, serverId }: ClientServerPageProps) => {
  const router = useRouter();

  useEffect(() => {
    const initialChannel = server?.channels?.[0];

    if (initialChannel?.name === "general") {
      router.replace(`/servers/${serverId}/channels/${initialChannel.id}`);
    } else {
      router.replace("/");
    }
  }, [server, serverId, router]);

  return <ChatLoadingState isFullChat />;
};

export default ClientServerPage;
