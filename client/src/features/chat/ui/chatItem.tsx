"use client";

import { IMember } from "@/entities/member/types/types";
import UserAvatar from "@/features/user/ui/userAvatar";
import { Member } from "@prisma/client";
import { FC, memo, useCallback } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { IMessage } from "@/entities/message/types/types";
import { useMessageHelper } from "../hooks/useMessageHelper";
import { useChangeMessage } from "../hooks/useChangeMessage";
import ChatMessageForm from "./chatMessageForm";
import FileBadge from "@/features/files/ui/fileBadge";
import MessageImage from "@/features/message/ui/messageImage";
import MessageEdited from "@/features/message/ui/messageEdited";
import MessageHeader from "@/features/message/ui/messageHeaderl";
import MessagePanel from "@/features/message/ui/messagePanel";

interface IChatItem {
  message: IMessage;
  currentMember: Member;
  isUpdated: boolean;
  socketQuery: Record<string, string>;
}

const ChatItem: FC<IChatItem> = memo(
  ({
    message: { id, content, deleted, fileUrl, member, createdAt },
    currentMember,
    isUpdated,
    socketQuery,
  }) => {
    const router = useRouter();
    const params = useParams();

    const { isPDF, isImage, timestamp, isCanEditMessage, isCanDeleteMessage } =
      useMessageHelper({
        createdAt,
        currentMember: currentMember as IMember,
        member,
        deleted,
        fileUrl,
      });

    const {
      isPending,
      isEditing,
      form,
      onSubmit,
      toggleEdit,
      handleOpenDeleteModal,
    } = useChangeMessage({ content, socketQuery, messageId: id });

    const handleMemberNavigate = useCallback(() => {
      if (member.id !== currentMember.id) {
        router.push(`/servers/${params?.serverId}/conversations/${member.id}`);
      }
    }, [currentMember, member, params, router]);

    return (
      <div className="relative group flex items-center hover:bg-black/5 p-4 transition-all w-full">
        <div className="group flex gap-x-2 items-start w-full">
          <div
            className="cursor-pointer hover:drop-shadow-md transition-all"
            onClick={handleMemberNavigate}
          >
            <UserAvatar src={(member as IMember).profile.imageUrl} />
          </div>
          <div className="flex flex-col w-full">
            <MessageHeader member={member} timestamp={timestamp} />
            {isImage && fileUrl && (
              <MessageImage content={content} url={fileUrl.url} />
            )}
            {isPDF && fileUrl && <FileBadge url={fileUrl.url} />}
            {!fileUrl && !isEditing && (
              <MessageEdited
                isDeleted={deleted}
                isEdited={isUpdated && !deleted}
                content={content}
              />
            )}
            {!fileUrl && isEditing && (
              <ChatMessageForm
                isPending={isPending}
                form={form}
                onSubmit={onSubmit}
              />
            )}
          </div>
        </div>
        {isCanDeleteMessage && (
          <MessagePanel
            isCanEdit={isCanEditMessage}
            editAction={toggleEdit}
            deleteAction={handleOpenDeleteModal}
          />
        )}
      </div>
    );
  }
);

export default ChatItem;

ChatItem.displayName = "ChatItem";
