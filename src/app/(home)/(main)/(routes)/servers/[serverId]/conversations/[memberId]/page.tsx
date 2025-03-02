import { getOrCreateConversation } from "@/entities/conversation/api/conversationQuery";
import { getChannelMembersByProfile } from "@/entities/member/api/memberQuery";
import { getCurrentProfile } from "@/entities/user/api/userQuery";
import ChatHeader from "@/features/chat/ui/chatHeader";
import { redirect } from "next/navigation";
import React, { FC } from "react";

interface IMemberIdPage {
  params: Promise<{
    memberId: string;
    serverId: string;
  }>;
}

const MemberId: FC<IMemberIdPage> = async ({ params }) => {
  const profile = await getCurrentProfile();
  if (!profile) return redirect("/sign-in");

  const { serverId, memberId } = await params;

  const currentMember = await getChannelMembersByProfile({
    profileId: profile.id,
    serverId,
  });

  if (!currentMember) {
    return redirect("/");
  }

  const conversation = await getOrCreateConversation({
    memberOneId: currentMember.id,
    memberTwoId: memberId,
  });

  if (!conversation) return redirect(`/servers/${serverId}`);

  const { memberOne, memberTwo } = conversation;

  const otherMember =
    memberOne.profileId === profile.id ? memberTwo : memberOne;

  return (
    <div className="bg-white dark:bg-gray-mode-200 flex flex-col h-full">
      <ChatHeader
        type="conversation"
        name={otherMember.profile.name}
        serverId={serverId}
        imageUrl={otherMember.profile.imageUrl}
      />
      <div className="flex-1">Future Messages</div>
    </div>
  );
};

export default MemberId;
