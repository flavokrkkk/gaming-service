"use client";

import { IMember } from "@/entities/member/types/types";
import { roleIconMap } from "@/features/server/libs/utils";
import UserAvatar from "@/features/user/ui/userAvatar";
import {
  Button,
  cn,
  Form,
  FormControl,
  FormField,
  FormItem,
  Input,
} from "@/shared";
import TooltipAction from "@/shared/ui/tooltip/tooltipAction";
import { zodResolver } from "@hookform/resolvers/zod";
import { Member, MemberRole } from "@prisma/client";
import { Edit, FileText, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FC, memo, useMemo, useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ChatFormSchema, TypeChatFormSchema } from "../schemes/chatFormShcema";
import { useKeyPress } from "@/shared/hooks/useKeyPress";
import { useEditMessage } from "../hooks/useEditMessage";
import { useActions } from "@/shared/hooks/useActions";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

interface IChatItem {
  id: string;
  content: string;
  member: Member;
  timestamp: string;
  fileUrl: { url: string; type: string } | null;
  deleted: boolean;
  currentMember: Member;
  isUpdated: boolean;
  socketUrl: string;
  socketQuery: Record<string, string>;
}

const ChatItem: FC<IChatItem> = memo(
  ({
    id,
    content,
    currentMember,
    deleted,
    fileUrl,
    isUpdated,
    member,
    socketQuery,
    socketUrl,
    timestamp,
  }) => {
    const [isEditing, setIsEditing] = useState(false);
    const { setIsOpen } = useActions();
    const router = useRouter();
    const params = useParams();

    const form = useForm<TypeChatFormSchema>({
      resolver: zodResolver(ChatFormSchema),
      defaultValues: {
        content,
      },
    });

    const { mutate, isPending } = useEditMessage();

    const isLoading = form.formState.isLoading;

    const isKeyPress = useKeyPress(["Escape"]);

    const { isImage, isPDF, isCanDeleteMessage, isCanEditMessage } =
      useMemo(() => {
        const isAdmin = currentMember.role === MemberRole.ADMIN;
        const isModerator = currentMember.role === MemberRole.MODERATOR;
        const isOwner = currentMember.id === member.id;

        const isCanDeleteMessage =
          !deleted && (isAdmin || isModerator || isOwner);
        const isCanEditMessage = !deleted && isOwner && !fileUrl?.url;

        const isPDF = fileUrl?.type === "pdf" && fileUrl?.url;
        const isImage = !isPDF && fileUrl?.url;

        return {
          isCanDeleteMessage,
          isCanEditMessage,
          isImage,
          isPDF,
          isOwner,
          isModerator,
          isAdmin,
        };
      }, [currentMember.role, currentMember.id, deleted, fileUrl, member.id]);

    const toggleEdit = useCallback(() => setIsEditing((p) => !p), []);

    const handleMemberNavigate = () => {
      if (member.id === currentMember.id) {
        return;
      }

      router.push(`/servers/${params?.serverId}/conversations/${member.id}`);
    };

    const handleOpenDeleteModal = () =>
      setIsOpen({
        type: "deleteMessage",
        data: {
          apiUrl: `${socketUrl}/${id}`,
          query: { ...socketQuery, messageId: id },
        },
      });

    const onSubmit = (values: TypeChatFormSchema) => {
      mutate({
        content: values.content,
        messageId: id,
        query: socketQuery,
      });
      form.reset();
      setIsEditing(false);
    };

    useEffect(() => {
      if (isKeyPress) {
        setIsEditing(false);
      }
    }, [isKeyPress]);

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
            <div className="flex items-center gap-x-2">
              <div className="flex items-center space-x-2">
                <p className="font-semibold text-sm hover:underline cursor-pointer">
                  {(member as IMember).profile.username}
                </p>
                <TooltipAction label={member.role} side="top">
                  {roleIconMap[member.role]}
                </TooltipAction>
              </div>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                {timestamp}
              </span>
            </div>
            {isImage && fileUrl && (
              <Link
                href={fileUrl.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-square rounded-lg mt-2 overflow-hidden border flex items-center bg-secondary h-48 w-48"
              >
                <Image
                  src={fileUrl.url}
                  alt={content}
                  fill
                  className="object-cover"
                  loading="lazy"
                />
              </Link>
            )}
            {isPDF && fileUrl && (
              <div
                className={cn(
                  "relative flex items-center gap-3 p-3 mt-2 rounded-lg bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 shadow-sm hover:bg-zinc-200/50 dark:hover:bg-zinc-800 transition-colors"
                )}
              >
                <div className="flex-shrink-0">
                  <FileText className="h-8 w-8 text-indigo-500 dark:text-indigo-400" />
                </div>

                <div className="flex-1 min-w-0">
                  <Link
                    href={fileUrl.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="line-clamp-1 flex whitespace-pre-wrap break-all text-start  text-sm md:text-xs  font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    PDF File
                  </Link>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                    Click to open in new tab
                  </p>
                </div>
              </div>
            )}
            {!fileUrl && !isEditing && (
              <p
                className={cn(
                  "text-sm text-zinc-600 dark:text-zinc-300",
                  deleted &&
                    "italic text-zinc-500 dark:text-zinc-400 text-xs mt-1"
                )}
              >
                {content}
                {isUpdated && !deleted && (
                  <span className="text-[10px] mx-2 text-zinc-500 dark:text-zinc-400">
                    (edited)
                  </span>
                )}
              </p>
            )}
            {!fileUrl && isEditing && (
              <Form {...form}>
                <form
                  className="flex items-center w-full gap-x-2 pt-2"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <div className="relative w-full">
                            <Input
                              {...field}
                              disabled={isLoading || isPending}
                              placeholder="Edited message"
                              className="p-2 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                            />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button
                    disabled={isLoading || isPending}
                    size={"sm"}
                    variant={"indigo"}
                  >
                    Save
                  </Button>
                </form>
                <span className="text-[10px] mt-1 text-zinc-400 ">
                  Press escape to cancel, enter to save
                </span>
              </Form>
            )}
          </div>
        </div>
        {isCanDeleteMessage && (
          <div className="hidden group-hover:flex items-center gap-x-2 absolute p-1 -top-2 right-5 bg-white dark:bg-zinc-800 border rounded-sm">
            {isCanEditMessage && (
              <TooltipAction side="top" label="Edit">
                <Edit
                  className="cursor-pointer ml-auto w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition-all"
                  onClick={toggleEdit}
                />
              </TooltipAction>
            )}
            <TooltipAction side="top" label="Edit">
              <Trash
                className="cursor-pointer ml-auto w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition-all"
                onClick={handleOpenDeleteModal}
              />
            </TooltipAction>
          </div>
        )}
      </div>
    );
  }
);

export default ChatItem;

ChatItem.displayName = "ChatItem";
