import { Avatar, AvatarImage, cn } from "@/shared";
import React, { FC } from "react";

interface IUserAvatar {
  src?: string;
  className?: string;
}
const UserAvatar: FC<IUserAvatar> = ({ className, src }) => {
  return (
    <Avatar className={cn("h-7 w-7 md:h-10 md:w-10", className)}>
      <AvatarImage src={src} />
    </Avatar>
  );
};

export default UserAvatar;
