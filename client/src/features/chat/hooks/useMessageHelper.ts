import { IMember } from "@/entities/member/types/types";
import { EDateFormat } from "@/shared/libs/utils/dateFormat";
import { EFileTypes } from "@/shared/libs/utils/files";
import { MemberRole } from "@prisma/client";
import { format } from "date-fns";
import { useMemo } from "react";

export const useMessageHelper = ({
  currentMember,
  member,
  fileUrl,
  deleted,
  createdAt,
}: {
  currentMember: IMember;
  member: IMember;
  createdAt: Date;
  deleted: boolean;
  fileUrl: { url: string; type: string };
}) => {
  const { isPDF, isImage } = useMemo(() => {
    const isPDF = fileUrl?.type === EFileTypes.PDF && fileUrl?.url;
    const isImage = !isPDF && fileUrl?.url;

    return {
      isPDF,
      isImage,
    };
  }, [fileUrl]);

  const { isCanDeleteMessage, isCanEditMessage } = useMemo(() => {
    const isAdmin = currentMember.role === MemberRole.ADMIN;
    const isModerator = currentMember.role === MemberRole.MODERATOR;
    const isOwner = currentMember.id === member.id;

    const isCanDeleteMessage = !deleted && (isAdmin || isModerator || isOwner);
    const isCanEditMessage = !deleted && isOwner && !fileUrl?.url;

    return {
      isAdmin,
      isOwner,
      isModerator,
      isCanDeleteMessage,
      isCanEditMessage,
    };
  }, [currentMember.role, currentMember.id, deleted, fileUrl, member.id]);

  const timestamp = useMemo(
    () => format(new Date(createdAt), EDateFormat.DMMMYYYY),
    [createdAt]
  );

  return {
    isPDF,
    isImage,
    timestamp,
    isCanEditMessage,
    isCanDeleteMessage,
  };
};
