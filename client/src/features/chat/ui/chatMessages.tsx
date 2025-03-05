"use client";
import { Member } from "@prisma/client";
import { FC, Fragment } from "react";
import ChatWelcome from "./chatWelcome";
import { useChatQuery } from "../hooks/useChatQuery";
import ChatItem from "./chatItem";
import { Separator } from "@/shared/ui/separator";
import { useChatSocket } from "../hooks/useChatSocket";
import ChatErrorState from "./chatErrorState";
import ChatLoadingState from "./chatLoadingState";

interface IChatMessages {
  name: string;
  member: Member;
  chatId: string;
  socketQuery: Record<string, string>;
  paramKey: "channelId" | "conversationId";
  paramValue: string;
  type: "channel" | "conversation";
}

export const ChatMessages: FC<IChatMessages> = ({
  name,
  type,
  chatId,
  member,
  paramKey,
  paramValue,
  socketQuery,
}) => {
  const { data, fetchNextPage, hasNextPage, isFetchNextPageError, status } =
    useChatQuery({
      paramKey,
      channelId: chatId,
      paramValue,
    });

  useChatSocket({ chatId });

  if (status === "pending") return <ChatLoadingState />;

  if (status === "error") return <ChatErrorState />;

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
                message={message}
                currentMember={member}
                socketQuery={socketQuery}
                isUpdated={message.updatedAt !== message.createdAt}
              />
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
};
