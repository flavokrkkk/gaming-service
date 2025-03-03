import { Menu } from "lucide-react";
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/shared/ui/sheet/sheet";
import NavigateServerBar from "@/features/server/ui/navigateServersBar";
import ServerSideBar from "@/features/server/ui/serverSideBar";
import { DialogTitle } from "@radix-ui/react-dialog";

const ServerMobileToggle = ({ serverId }: { serverId: string }) => {
  return (
    <Sheet>
      <DialogTitle className="sr-only">Mobile toggle</DialogTitle>
      <SheetTrigger asChild>
        <Menu className="w-4 h-4 cursor-pointer mr-2 md:hidden" />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="p-0 flex gap-0 w-[300px] max-w-[90vw]"
      >
        <div className="w-[72px] flex-shrink-0">
          <NavigateServerBar />
        </div>
        <div className="flex-1">
          <ServerSideBar serverId={serverId} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ServerMobileToggle;
