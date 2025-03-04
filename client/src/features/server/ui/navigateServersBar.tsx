import NavigateServerAction from "./navigateServerAction";
import { Separator } from "@/shared/ui/separator";
import { ScrollArea } from "@/shared/ui/scrollArea";
import NavigateServerItem from "./navigateServerItem";
import ThemeSwitcher from "@/features/theme/ui/themeSwitcher";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Skeleton } from "@/shared/ui/skeleton/skeleton";
import UserAvatar from "@/features/user/ui/userAvatar";
import { getAllServers } from "@/entities";
import { getCurrentProfile } from "@/entities/user/libs/userService";

const NavigateServerBar = async () => {
  const profile = await getCurrentProfile();

  if (!profile) return redirect("/sign-in");

  const servers = await getAllServers({ profileId: profile.id });
  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-gray-mode-300 bg-[#E3E5E8] py-3">
      <NavigateServerAction />
      <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
      <ScrollArea className="flex-1 w-full">
        <Suspense
          fallback={<Skeleton className="h-[48px] w-[48px] rounded-full" />}
        >
          {servers.map(({ id, name, imageUrl }) => (
            <div key={id} className="mb-4">
              <NavigateServerItem id={id} name={name} imageUrl={imageUrl} />
            </div>
          ))}
        </Suspense>
      </ScrollArea>
      <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
        <ThemeSwitcher />
        <UserAvatar
          src={profile.imageUrl}
          className="h-[48px] cursor-pointer w-[48px] rounded-full transition-all duration-200 group-hover:scale-105 group-hover:ring-2 group-hover:ring-emerald-500"
        />
      </div>
    </div>
  );
};

export default NavigateServerBar;
