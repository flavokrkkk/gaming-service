"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared";

import { serverSelectors } from "@/entities/server/models/store/serverSlice";
import { useActions } from "@/shared/hooks/useActions";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { useCallback, useMemo, useState } from "react";
import { ScrollArea } from "@/shared/ui/scrollArea";
import { Loader2, Users } from "lucide-react";
import ServerMemberCard from "./serverMemberCard";
import ServerMemberControl from "./serverMemberControl";
import { useChangeMember } from "../hooks/useChangeMember";
import { MemberRole } from "@prisma/client";
import { useRemoveMember } from "../hooks/useRemoveMember";

const ServerMembersModal = () => {
  const [loadingId, setLoadingId] = useState("");

  const isOpen = useAppSelector(serverSelectors.isOpen);
  const type = useAppSelector(serverSelectors.type);
  const { setClose } = useActions();
  const selectServers = useAppSelector(serverSelectors.selectServers);
  const { mutate } = useChangeMember(setLoadingId);
  const { mutate: deleteMutate } = useRemoveMember(setLoadingId);

  const { handleClose, isModalOpen } = useMemo(() => {
    return {
      isModalOpen: isOpen && type === "members",
      handleClose: () => setClose(),
    };
  }, [setClose, isOpen, type]);

  const handleDeleteMember = useCallback(
    ({ memberId }: { memberId: string }) => {
      if (selectServers?.server) {
        deleteMutate({ serverId: selectServers?.server.id, memberId });
      }
    },
    [selectServers, deleteMutate]
  );

  const handleChageMember = useCallback(
    (request: { memberId: string; role: MemberRole }) => {
      if (selectServers?.server) {
        mutate({ serverId: selectServers?.server.id, ...request });
      }
    },
    [selectServers, mutate]
  );

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-zinc-900 text-white border border-zinc-800 rounded-lg shadow-2xl mx-auto overflow-hidden">
        <DialogHeader className="pt-6 px-6 pb-4 border-b border-zinc-800">
          <DialogTitle className="text-2xl text-center font-bold tracking-tight">
            Manage Members
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-400 text-sm">
            {selectServers?.server.members?.length} Members
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="mt-6 max-h-[420px] px-6">
          {selectServers?.server?.members ? (
            selectServers?.server?.members.map((member) => (
              <ServerMemberCard key={member.id} member={member}>
                {selectServers?.server.profileId !== member.profileId &&
                  loadingId !== member.id && (
                    <ServerMemberControl
                      member={member}
                      handleChageMember={handleChageMember}
                      handleDeleteMember={handleDeleteMember}
                    />
                  )}
                {loadingId === member.id && (
                  <Loader2 className="animate-spin text-indigo-400 ml-auto w-5 h-5" />
                )}
              </ServerMemberCard>
            ))
          ) : (
            <div className="text-center text-zinc-400 py-10">
              <Users className="h-12 w-12 mx-auto mb-4 text-zinc-500" />
              <p className="text-sm">No members found</p>
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ServerMembersModal;
