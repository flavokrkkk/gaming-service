"use client";

import { cn } from "@/shared";
import { ERouteNames } from "@/shared/libs/utils/pathVariables";
import TooltipAction from "@/shared/ui/tooltip/tooltipAction";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { FC } from "react";

interface INavigateServerItem {
  id: string;
  imageUrl: string;
  name: string;
}

const NavigateServerItem: FC<INavigateServerItem> = ({
  id,
  imageUrl,
  name,
}) => {
  const router = useRouter();
  const params = useParams();

  const handleNavigate = () => router.push(`${ERouteNames.SERVERS}/${id}`);

  return (
    <TooltipAction side="right" align="center" label={name}>
      <button
        className="group relative flex items-center"
        onClick={handleNavigate}
      >
        <div
          className={cn(
            "absolute left-0 bg-primary rounded-r-full transition-all w-1",
            params?.serverId !== id && "group-hover:h-[20px]",
            params?.serverId === id ? "h-[36px]" : "h-2"
          )}
        />
        <div
          className={cn(
            "relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden",
            params?.serverId === id &&
              "bg-primary/10 text-primary rounded-[16px]"
          )}
        >
          <Image fill src={imageUrl} alt="Channel" />
        </div>
      </button>
    </TooltipAction>
  );
};

export default NavigateServerItem;
