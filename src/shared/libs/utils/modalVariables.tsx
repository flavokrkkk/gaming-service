import { ModalType } from "@/entities/server/models/types/types";
import ChannelCreateModal from "@/features/channel/ui/channelCreateModal";
import ChannelDeleteModal from "@/features/channel/ui/channelDeleteModal";
import ChannelEditModal from "@/features/channel/ui/channelEditModal";
import ChatMessageFileModal from "@/features/chat/ui/chatMesageFileModal";
import ServerCustomizeModal from "@/features/server/ui/serverCustomizeModal";
import ServerDeleteModal from "@/features/server/ui/serverDeleteModal";
import ServerEditModal from "@/features/server/ui/serverEditModal";
import ServerInviteModal from "@/features/server/ui/serverInviteModal";
import ServerLeaveModal from "@/features/server/ui/serverLeaveModal";
import ServerMembersModal from "@/features/server/ui/serverMembersModal";
import { JSX } from "react";

export const uniqueModal: Record<ModalType, JSX.Element> = {
  ["createServer"]: <ServerCustomizeModal />,
  ["invite"]: <ServerInviteModal />,
  ["editServer"]: <ServerEditModal />,
  ["members"]: <ServerMembersModal />,
  ["createChannel"]: <ChannelCreateModal />,
  ["leaveServer"]: <ServerLeaveModal />,
  ["deleteServer"]: <ServerDeleteModal />,
  ["deleteChannel"]: <ChannelDeleteModal />,
  ["editChannel"]: <ChannelEditModal />,
  ["messageFile"]: <ChatMessageFileModal />,
};
