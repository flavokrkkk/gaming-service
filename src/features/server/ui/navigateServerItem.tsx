"use client";

import { cn } from "@/shared";
import { ERouteNames } from "@/shared/libs/utils/pathVariables";
import { Skeleton } from "@/shared/ui/skeleton/skeleton";
import TooltipAction from "@/shared/ui/tooltip/tooltipAction";
import clsx from "clsx";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { FC, useState } from "react";

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
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();
  const params = useParams();

  const handleNavigate = () => router.push(`${ERouteNames.SERVERS}/${id}`);

  const handleIsLoaded = () => setIsLoaded(true);

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
          {!isLoaded && (
            <Skeleton
              className={clsx(
                "h-12 w-12 absolute inset-0",
                params?.serverId === id ? "rounded-[16px]" : " rounded-full"
              )}
            />
          )}
          <Image
            fill
            src={imageUrl}
            alt={name}
            sizes="48px"
            className="object-cover transition-opacity duration-300"
            style={{ opacity: isLoaded ? 1 : 0 }}
            onLoad={handleIsLoaded}
          />
        </div>
      </button>
    </TooltipAction>
  );
};

export default NavigateServerItem;
