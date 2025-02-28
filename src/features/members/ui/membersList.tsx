import { IServer } from "@/entities";
import { IMember } from "@/entities/member/types/types";
import ServerMember from "@/features/server/ui/serverMember";
import ServerSection from "@/features/server/ui/serverSection";
import { MemberRole } from "@prisma/client";
import React, { FC } from "react";
interface IMembersList {
  members: Array<IMember>;
  server: IServer;
  role: MemberRole;
}
const MembersList: FC<IMembersList> = ({ members, role, server }) => {
  return (
    <div className="mb-2">
      <ServerSection
        sectionType="members"
        label="Members"
        role={role}
        server={server}
      />
      {members.map((member) => (
        <ServerMember key={member.id} member={member} server={server} />
      ))}
    </div>
  );
};

export default MembersList;
