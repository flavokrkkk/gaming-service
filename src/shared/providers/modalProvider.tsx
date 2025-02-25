import ServerCustomizeModal from "@/features/server/ui/serverCustomizeModal";
import ServerInviteModal from "@/features/server/ui/serverInviteModal";
import React from "react";

const ModalProvider = () => {
  return (
    <>
      <ServerCustomizeModal />;
      <ServerInviteModal />
    </>
  );
};

export default ModalProvider;
