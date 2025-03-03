import { MemberRole } from "@prisma/client";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import { JSX } from "react";

export const roleIconMap: Record<MemberRole, JSX.Element | null> = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: <ShieldCheck className="h-4 w-4  text-indigo-500" />,
  [MemberRole.ADMIN]: <ShieldAlert className="h-4 w-4 text-rose-500" />,
};
