import ChannelCreateModal from "@/features/channel/ui/channelCreateModal";
import ServerCustomizeModal from "@/features/server/ui/serverCustomizeModal";
import ServerDeleteModal from "@/features/server/ui/serverDeleteModal";
import ServerEditModal from "@/features/server/ui/serverEditModal";
import ServerInviteModal from "@/features/server/ui/serverInviteModal";
import ServerLeaveModal from "@/features/server/ui/serverLeaveModal";
import ServerMembersModal from "@/features/server/ui/serverMembersModal";
import React from "react";

const ModalProvider = () => {
  return (
    <>
      <ServerCustomizeModal />;
      <ServerInviteModal />
      <ServerEditModal />
      <ChannelCreateModal />
      <ServerLeaveModal />
      <ServerDeleteModal />
      <ServerMembersModal />
    </>
  );
};

export default ModalProvider;
