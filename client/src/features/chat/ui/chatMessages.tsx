"use client";
import { Member } from "@prisma/client";
import { FC, Fragment } from "react";
import ChatWelcome from "./chatWelcome";
import { useChatQuery } from "../hooks/useChatQuery";
import { Loader2, ServerCrash } from "lucide-react";
import { format } from "date-fns";
import ChatItem from "./chatItem";
import { EDateFormat } from "@/shared/libs/utils/dateFormat";
import { Separator } from "@/shared/ui/separator";
import { useChatSocket } from "../hooks/useChatSocket";

interface IChatMessages {
  name: string;
  member: Member;
  chatId: string;
  apiUrl: string;
  socketUrl: string;
  socketQuery: Record<string, string>;
  paramKey: "channelId" | "conversationId";
  paramValue: string;
  type: "channel" | "conversation";
}

const ChatMessages: FC<IChatMessages> = ({
  apiUrl,
  chatId,
  member,
  name,
  paramKey,
  paramValue,
  socketQuery,
  socketUrl,
  type,
}) => {
  const queryKey = `chat:${chatId}`;
  const addKey = `newMessage`;
  const deleteKey = `deleteMessage`;
  const updateKey = `updateMessage`;

  const { data, fetchNextPage, hasNextPage, isFetchNextPageError, status } =
    useChatQuery({
      apiUrl,
      paramKey,
      channelId: chatId,
      paramValue,
      queryKey,
    });

  useChatSocket({ queryKey, addKey, updateKey, deleteKey });

  if (status === "pending") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <Loader2 className="animate-spin h-7 w-7 text-zinc-500 my-4 " />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Loading messages...
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <ServerCrash className="h-7 w-7 text-zinc-500 my-4 " />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Something went wrong!
        </p>
      </div>
    );
  }
  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      <div className="flex-1" />
      <ChatWelcome type={type} name={name} role={member.role} />
      <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2" />
      <div className="flex flex-col-reverse mt-auto">
        {data?.pages.map((group, i) => (
          <Fragment key={i}>
            {group.items.map((message) => (
              <ChatItem
                key={message.id}
                id={message.id}
                currentMember={member}
                member={message.member}
                content={message.content}
                fileUrl={message.fileUrl}
                deleted={message.deleted}
                timestamp={format(
                  new Date(message.createdAt),
                  EDateFormat.DMMMYYYY
                )}
                isUpdated={message.updatedAt !== message.createdAt}
                socketUrl={socketUrl}
                socketQuery={socketQuery}
              />
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default ChatMessages;
