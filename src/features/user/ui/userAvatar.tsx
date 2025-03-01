"use client";

import { Avatar, AvatarImage, cn } from "@/shared";
import { useSkeletonImage } from "@/shared/hooks/useSkeletonImage";
import { Skeleton } from "@/shared/ui/skeleton/skeleton";
import React, { FC } from "react";

interface IUserAvatar {
  src?: string;
  className?: string;
}
const UserAvatar: FC<IUserAvatar> = ({ className, src }) => {
  const { isLoaded, handleIsLoaded } = useSkeletonImage();

  return (
    <>
      <Avatar className={cn("h-7 w-7 md:h-10 md:w-10", className)}>
        <AvatarImage src={src} onLoad={handleIsLoaded} />
        {!isLoaded && <Skeleton className="h-12 w-12 rounded-full " />}
      </Avatar>
    </>
  );
};

export default UserAvatar;
