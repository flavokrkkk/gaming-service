import ServerPanelLayout from "@/features/server/ui/serverPanelLayout";
import { FC, PropsWithChildren } from "react";

const HomeLayout: FC<PropsWithChildren> = async ({ children }) => {
  return <ServerPanelLayout>{children}</ServerPanelLayout>;
};

export default HomeLayout;
