import { getAllServers } from "@/entities/server/api";
import { getCurrentProfile } from "@/entities/user/api/userQuery";
import { redirect } from "next/navigation";
import NavigateServerAction from "./navigateServerAction";
import { Separator } from "@/shared/ui/separator";
import { ScrollArea } from "@/shared/ui/scrollArea";
import NavigateServerItem from "./navigateServerItem";
import ThemeSwitcher from "@/features/theme/ui/themeSwitcher";
import { UserButton } from "@clerk/nextjs";

const NavigateServerBar = async () => {
  const profile = await getCurrentProfile();

  if (!profile) return redirect("/");

  const servers = await getAllServers({ profileId: profile.id });

  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-gray-mode-300 py-3">
      <NavigateServerAction />
      <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
      <ScrollArea className="flex-1 w-full">
        {servers.map(({ id, name, imageUrl }) => (
          <div className="mb-4" key={id}>
            <NavigateServerItem id={id} name={name} imageUrl={imageUrl} />
          </div>
        ))}
      </ScrollArea>
      <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
        <ThemeSwitcher />
        <div className="relative group">
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox:
                  "h-[48px] w-[48px] rounded-full transition-all duration-200 group-hover:scale-105 group-hover:ring-2 group-hover:ring-emerald-500",
              },
            }}
          />
          <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-gray-800" />
        </div>
      </div>
    </div>
  );
};

export default NavigateServerBar;
