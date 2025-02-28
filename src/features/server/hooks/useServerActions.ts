import { IServer } from "@/entities";
import { useActions } from "@/shared/hooks/useActions";
import { useCallback } from "react";

export const useServerActions = (server: IServer) => {
  const { setIsOpen } = useActions();

  const handleOpenInviteModal = useCallback(
    () => setIsOpen({ type: "invite", data: { server } }),
    [server]
  );

  const handleOpenEditModal = useCallback(
    () => setIsOpen({ type: "editServer", data: { server } }),
    [server]
  );

  const handleOpenMembersModal = useCallback(
    () => setIsOpen({ type: "members", data: { server } }),
    [server]
  );

  const handleOpenCreateChannelModal = useCallback(
    () => setIsOpen({ type: "createChannel" }),
    [server]
  );
  const handleOpenLeaveServerModal = useCallback(
    () => setIsOpen({ type: "leaveServer", data: { server } }),
    [server]
  );

  const handleOpenDeleteServerModal = useCallback(
    () => setIsOpen({ type: "deleteServer", data: { server } }),
    [server]
  );

  return {
    handleOpenInviteModal,
    handleOpenEditModal,
    handleOpenMembersModal,
    handleOpenCreateChannelModal,
    handleOpenLeaveServerModal,
    handleOpenDeleteServerModal,
  };
};
