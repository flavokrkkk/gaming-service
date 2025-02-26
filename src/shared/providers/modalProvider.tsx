import ServerCustomizeModal from "@/features/server/ui/serverCustomizeModal";
import ServerEditModal from "@/features/server/ui/serverEditModal";
import ServerInviteModal from "@/features/server/ui/serverInviteModal";
import ServerMembersModal from "@/features/server/ui/serverMembersModal";
import React from "react";

const ModalProvider = () => {
  return (
    <>
      <ServerCustomizeModal />;
      <ServerInviteModal />
      <ServerEditModal />
      <ServerMembersModal />
    </>
  );
};

export default ModalProvider;
